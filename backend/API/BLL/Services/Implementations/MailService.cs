using API.DAL.Entites;
using API.DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using API.BLL.DTOs.LetterDTOs;
using API.BLL.Mappers;
using API.BLL.Services.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace API.BLL.Services.Implementations;

public class MailService : IMailService
{
    private readonly ILetterRepository _letterRepository;
    private readonly IUserRepository _userRepository;
    private readonly UserManager<User> _userManager;    

    public MailService(
        ILetterRepository letterRepository,
        IUserRepository userRepository,
         UserManager<User> userManager)
    {
        _letterRepository = letterRepository;
        _userRepository = userRepository;
        _userManager = userManager;
    }

    public async Task<string> ComposeAsync(ComposeLetterDto composeLetterDto)
    {
        var sender = await _userRepository.GetByIdAsync(composeLetterDto.SenderId);
        var receiver = await _userManager.FindByEmailAsync(composeLetterDto.ReceiverEmail);
        if (sender == null || receiver == null)
            return "Invalid letter's members.";

        await _letterRepository.CreateAsync(composeLetterDto.ToLetterTable(receiver.Id));
        return string.Empty;
    }

    public async Task<IEnumerable<DisplayLetterDto>> LoadInboxAsync(Guid userId)
    {
        var user = await _userRepository.GetByIdAsync(userId);
        IQueryable<Letter> letters = await _letterRepository.GetAllAsync();

        var received = letters
            .Where(l => l.ReceiverId == userId && !l.IsDeletedByReceiver)
            .Include(l => l.Sender)
            .Include(l => l.Receiver)
            .OrderByDescending(l => l.Date)
            .Select(l => l.ToDisplayLetterDto());

        return received;
    }

    public async Task<IEnumerable<DisplayLetterDto>> LoadSentAsync(Guid userId)
    {
        var user = await _userRepository.GetByIdAsync(userId);
        IQueryable<Letter> letters = await _letterRepository.GetAllAsync();

        var sent = letters
            .Where(l => l.SenderId == userId && !l.IsDeletedBySender)
            .Include(l => l.Sender)
            .Include(l => l.Receiver)
            .OrderByDescending(l => l.Date)
            .Select(l => l.ToDisplayLetterDto());

        return sent;
    }

    public async Task<DisplayLetterDto> LoadLetterAsync(Guid letterId)
    {
        var letter = await _letterRepository.GetByIdAsync(letterId);
        return letter!.ToDisplayLetterDto();
    }

    public async Task ChangeIsReadAsync(Guid letterId)
    {
        var letter = await _letterRepository.GetByIdAsync(letterId);
        letter!.IsRead = !letter.IsRead;
        await _letterRepository.UpdateAsync(letter);
    }

    public async Task ChangeIsDeletedByReceiverAsync(Guid letterId)
    {
        var letter = await _letterRepository.GetByIdAsync(letterId);
        letter!.IsDeletedByReceiver = !letter.IsDeletedByReceiver;
        await _letterRepository.UpdateAsync(letter);
    }

    public async Task ChangeIsDeletedBySenderAsync(Guid letterId)
    {
        var letter = await _letterRepository.GetByIdAsync(letterId);
        letter!.IsDeletedBySender = !letter.IsDeletedBySender;
        await _letterRepository.UpdateAsync(letter);
    }
}
