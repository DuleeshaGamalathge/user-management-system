using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using dotnet_backend.Models;
using dotnet_backend.Data;
using Microsoft.EntityFrameworkCore;

namespace dotnet_backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public AuthController(AppDbContext context, IConfiguration config)
    { 
        _context = context;
        _config = config;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
            {
                 _context.LoginAudits.Add(new LoginAudit
                {
                    Email = request.Email,
                    LoginTime = DateTime.UtcNow,
                    IsSuccess = false,
                    Message = "User not found"
                });

                await _context.SaveChangesAsync();

                return Unauthorized("Invalid credentials");
            }

            if (!user.IsActive)
            {
                 _context.LoginAudits.Add(new LoginAudit
                {
                    UserId = user.Id,
                    Email = user.Email,
                    LoginTime = DateTime.UtcNow,
                    IsSuccess = false,
                    Message = "Account inactive"
                });

                await _context.SaveChangesAsync();

                return Unauthorized("Account is inactive");
            }

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(
                request.Password,
                user.Password
            );

            if (!isPasswordValid)
            {
                _context.LoginAudits.Add(new LoginAudit
                {
                    UserId = user.Id,
                    Email = user.Email,
                    LoginTime = DateTime.UtcNow,
                    IsSuccess = false,
                    Message = "Invalid password"
                });

                await _context.SaveChangesAsync();

                return Unauthorized("Invalid credentials");
            }

            user.LastLoginAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            _context.LoginAudits.Add(new LoginAudit
            {
                UserId = user.Id,
                Email = user.Email,
                LoginTime = DateTime.UtcNow,
                IsSuccess = true,
                Message = "Login successful"
            });

            await _context.SaveChangesAsync();
            
            var token = GenerateJwtToken(user);

            return Ok(new { token });
    }

    private string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(
                Convert.ToDouble(_config["Jwt:ExpiryMinutes"])
            ),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);    
        
    }
}
