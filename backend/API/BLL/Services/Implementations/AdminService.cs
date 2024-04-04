using API.BLL.DTOs.LetterDTOs;
using API.BLL.DTOs.UserDTOs;
using API.BLL.Mappers;
using API.BLL.Services.Interfaces;
using API.DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.BLL.Services.Implementations;

public class AdminService : IAdminService
{
    private readonly IUserRepository _userRepository;
    private readonly ILetterRepository _letterRepository;

    public AdminService(
        IUserRepository userRepository,
        ILetterRepository letterRepository)
    {
        _userRepository = userRepository;
        _letterRepository = letterRepository;
    }

    public async Task<(bool, string)> DeleteLetterAsync(Guid letterId)
    {
        var targetLetter = await _letterRepository.GetByIdAsync(letterId);
        if (targetLetter == null)
            return (false, "Invalid letter id.");

        await _letterRepository.DeleteAsync(targetLetter);
        return (true, string.Empty);
    }

    public async Task<(bool, string)> DeleteUserAsync(Guid userId)
    {
        var targetUser = await _userRepository.GetByIdAsync(userId);
        if (targetUser == null)
            return (false, "Invalid user id.");

        await _userRepository.DeleteAsync(targetUser);
        return (true, string.Empty);
    }

    public async Task<IEnumerable<DisplayLetterDto>> GetAllLettersAsync()
    {
        var totalLetters = await _letterRepository.GetAllAsync();
        return totalLetters
            .Include(l => l.Sender)
            .Include(l => l.Receiver)
            .Select(l => l.ToDisplayLetterDto());
    }

    public async Task<IEnumerable<DisplayUserDto>> GetAllUsersAsync()
    {
        var totalUsers = await _userRepository.GetAllAsync();
        return totalUsers
            .Select(u => u.ToDisplayUserDto());
    }
}
