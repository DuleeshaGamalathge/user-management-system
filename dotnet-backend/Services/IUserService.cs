using dotnet_backend.DTOs;

namespace dotnet_backend.Services;

public interface IUserService
{
    Task<IEnumerable<UserDto>> GetUsersAsync();

    Task<UserDto> CreateUserAsync(CreateUserDto dto);

    Task<bool> DeleteUserAsync(int id);

    Task<UserDto?> UpdateUserAsync(int id, UpdateUserDto dto);
}