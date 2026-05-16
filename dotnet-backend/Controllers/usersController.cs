using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using dotnet_backend.Models;
using dotnet_backend.Data;
using Microsoft.EntityFrameworkCore;
using dotnet_backend.DTOs;

namespace dotnet_backend.Controllers{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]

    public class UsersController : ControllerBase
    {

        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.ToListAsync();

            var userDtos = users.Select(u => new UserDto
            {
                Id = u.Id,
                Name = u.Name,
                Email = u.Email
            });

            return Ok(userDtos);
        }
        
        [HttpPost]
        public async Task<IActionResult> CreateUser(CreateUserDto newUser)
        {
            //validation
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            //check duplicate email
            var existingUser = await _context.Users
                .AnyAsync(u => u.Email == newUser.Email);

            if (existingUser)
                return BadRequest("Email already exists");

            var user = new User
            {
                Name = newUser.Name,
                Email = newUser.Email,

                // hashing
                Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password),

                Role = newUser.Role
            };

            // Save user
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UpdateUserDto updatedUser)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound();

            //check duplicate email
            var existingEmail = await _context.Users
                .AnyAsync(u => u.Email == updatedUser.Email && u.Id != id);

            if (existingEmail)
                return BadRequest("Email already exists");

            user.Name = updatedUser.Name;
            user.Email = updatedUser.Email;
            if (!string.IsNullOrWhiteSpace(updatedUser.Password))
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(updatedUser.Password);
            }
            user.Role = updatedUser.Role;

            await _context.SaveChangesAsync();

            return Ok(user);
        }

    }

}
