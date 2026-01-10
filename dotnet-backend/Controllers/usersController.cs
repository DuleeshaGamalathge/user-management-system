using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private static List<User> Users = new List<User>
    {
        new User { Id = 1, Name = "Duleesha Rashmi", Email = "duleesha@example.com" },
        new User { Id = 2, Name = "Alice", Email = "alice@example.com" },
        new User { Id = 3, Name = "Bob", Email = "bob@example.com" }
    };

    [HttpGet]
    public IActionResult GetUsers()
    {
        return Ok(Users);
    }
    
    [HttpPost]
    public IActionResult CreateUser([FromBody] User newUser)
    {
        if (string.IsNullOrWhiteSpace(newUser.Name))
            return BadRequest("Name is required");

        if (string.IsNullOrWhiteSpace(newUser.Email))
            return BadRequest("Email is required");

        if (Users.Any(u => u.Email == newUser.Email))
            return BadRequest("Email already exists");

        newUser.Id = Users.Max(u => u.Id) + 1;
        Users.Add(newUser);
        return Ok(newUser);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteUser(int id)
    {
        var user = Users.FirstOrDefault(u => u.Id == id);

        if (user == null)
        {
            return NotFound();
        }

        Users.Remove(user);
        return NoContent();
    }

    [HttpPut("{id}")]
    public IActionResult UpdateUser(int id, User updatedUser)
    {
        var user = Users.FirstOrDefault(u => u.Id == id);
        if (user == null)
            return NotFound("User not found");

        if (Users.Any(u => u.Email == updatedUser.Email && u.Id != id))
            return BadRequest("Email already exists");

        user.Name = updatedUser.Name; 
        user.Email = updatedUser.Email;

        return Ok(user);
    }

}
