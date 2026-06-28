using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using dotnet_backend.Models;
using dotnet_backend.Data;
using Microsoft.EntityFrameworkCore;
using dotnet_backend.DTOs;
using dotnet_backend.Services;

namespace dotnet_backend.Controllers{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]

    public class UsersController : ControllerBase
    {

        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userService.GetUsersAsync();

            return Ok(users);
        }
        
        [HttpPost]
        public async Task<IActionResult> CreateUser(CreateUserDto dto)
        {
            //validation
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userService.CreateUserAsync(dto);

            return Ok(user);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var success = await _userService.DeleteUserAsync(id);

            if (!success)
            {
                return NotFound();
            }

            return Ok("User deactivated successfully");;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UpdateUserDto dto)
        {
            var user = await _userService.UpdateUserAsync(id, dto);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

    }

}
