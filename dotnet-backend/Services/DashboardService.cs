using dotnet_backend.Data;
using dotnet_backend.DTOs;
using Microsoft.EntityFrameworkCore;

namespace dotnet_backend.Services;

public class DashboardService : IDashboardService
{
    private readonly AppDbContext _context;

    public DashboardService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardSummaryDto> GetSummaryAsync()
    {
        var startDate = new DateTime(
            DateTime.UtcNow.Year,
            DateTime.UtcNow.Month,
            1
        ).AddMonths(-5);

        var registrationData = await _context.Users
            .Where(u => u.CreatedAt >= startDate)
            .GroupBy(u => new
            {
                u.CreatedAt.Year,
                u.CreatedAt.Month
            })
            .Select(g => new
            {
                g.Key.Year,
                g.Key.Month,
                UserCount = g.Count()
            })
            .OrderBy(x => x.Year)
            .ThenBy(x => x.Month)
            .ToListAsync();

        var registrationsByMonth = Enumerable
            .Range(0, 6)
            .Select(i =>
            {
                var period = startDate.AddMonths(i);

                var data = registrationData.FirstOrDefault(x =>
                    x.Year == period.Year &&
                    x.Month == period.Month);

                return new RegistrationStatisticsDto
                {
                    Period = period,
                    UserCount = data?.UserCount ?? 0
                };
            })
            .ToList();

        return new DashboardSummaryDto
        {
            TotalUsers = await _context.Users.CountAsync(),

            ActiveUsers = await _context.Users.CountAsync(u => u.IsActive),

            InactiveUsers = await _context.Users.CountAsync(u => !u.IsActive),

            AdminUsers = await _context.Users.CountAsync(u => u.Role == "Admin"),

            UsersByRole = await _context.Users
            .GroupBy(u => u.Role)
            .Select(g => new DashboardRoleSummaryDto
            {
                Role = g.Key,
                UserCount = g.Count()
            })
            .ToListAsync(),

            RegistrationsByMonth = registrationsByMonth
        };
    }

}