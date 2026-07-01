namespace dotnet_backend.Models;

public class LoginAudit
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public string Email { get; set; } = string.Empty;

    public DateTime LoginTime { get; set; }

    public bool IsSuccess { get; set; }

    public string Message { get; set; } = string.Empty;
}