namespace dotnet_backend.DTOs;

public class RecentLoginDto
{
    public string Email { get; set; } = string.Empty;

    public DateTime LoginTime { get; set; }

    public bool IsSuccess { get; set; }

    public string Message { get; set; } = string.Empty;
}