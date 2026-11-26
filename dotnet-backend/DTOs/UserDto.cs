using System.ComponentModel.DataAnnotations;

namespace dotnet_backend.DTOs;

public class UserDto
{
    public int Id { get; set; }   
    public string Name { get; set; }
    public string Email { get; set; }
    public string Role { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastLoginAt { get; set; }
}

public class CreateUserDto
{
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [PasswordValidation]
    public string Password { get; set; } = string.Empty;

    [Required]
    public string Role { get; set; } = string.Empty;
}

public class UpdateUserDto
{
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [PasswordValidation(allowEmpty: true)]
    public string Password { get; set; }

    [Required]
    public string Role { get; set; } = string.Empty;
}