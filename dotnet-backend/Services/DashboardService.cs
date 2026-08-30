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
            .ToListAsync()
        };
    }

}