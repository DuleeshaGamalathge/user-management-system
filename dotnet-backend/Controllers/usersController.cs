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
}
