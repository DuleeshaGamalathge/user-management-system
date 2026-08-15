namespace dotnet_backend.DTOs;

public class DashboardSummaryDto
{
    public int TotalUsers { get; set; }

    public int ActiveUsers { get; set; }

    public int InactiveUsers { get; set; }

    public int AdminUsers { get; set; }
}