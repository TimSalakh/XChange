using API.DAL.Entites;
using API.DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using API.BLL.DTOs.LetterDTOs;
using API.BLL.Mappers;
using API.BLL.Services.Interfaces;

namespace API.BLL.Services.Implementations;

public class LetterService : ILetterService
{
    private readonly ILetterRepository _letterRepository;
    private readonly IUserRepository _userRepository;

    public LetterService(
        ILetterRepository letterRepository,
        IUserRepository userRepository)
    {
        _letterRepository = letterRepository;
        _userRepository = userRepository;
    }

    public async Task<(bool, string)> ComposeAsync(ComposeLetterDto composeLetterDto)
    {
        var sender = await _userRepository.GetByIdAsync(composeLetterDto.Sender);
        var receiver = await _userRepository.GetByIdAsync(composeLetterDto.Receiver);
        if (sender == null || receiver == null)
            return (false, "Invalid letter's members.");

        await _letterRepository.CreateAsync(composeLetterDto.ToLetterTable());
        return (true, string.Empty);
    }

    public async Task<(IEnumerable<DisplayLetterDto>, string)> LoadReceivedAsync(Guid userId)
    {
        var user = await _userRepository.GetByIdAsync(userId);
        if (user == null)
            return ([], "Invalid user id.");

        IQueryable<Letter> letters = await _letterRepository.GetAllAsync();

        var received = letters
            .Where(l => l.ReceiverId == userId)
            .Include(l => l.Sender)
            .Include(l => l.Receiver)
            .Select(l => l.ToDisplayLetterDto());

        return (received, string.Empty);
    }

    public async Task<(IEnumerable<DisplayLetterDto>, string)> LoadSentAsync(Guid userId)
    {
        var user = await _userRepository.GetByIdAsync(userId);
        if (user == null)
            return ([], "Invalid user id.");

        IQueryable<Letter> letters = await _letterRepository.GetAllAsync();

        var received = letters
            .Where(l => l.SenderId == userId)
            .Include(l => l.Sender)
            .Include(l => l.Receiver)
            .Select(l => l.ToDisplayLetterDto());

        return (received, string.Empty);
    }
}
