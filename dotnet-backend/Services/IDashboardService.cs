using dotnet_backend.DTOs;

namespace dotnet_backend.Services;

public interface IDashboardService
{
    Task<DashboardSummaryDto> GetSummaryAsync();

    // Task<IEnumerable<DashboardRoleSummaryDto>> GetUsersByRoleAsync();
}