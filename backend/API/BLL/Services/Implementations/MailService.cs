using API.DAL.Entites;
using API.DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using API.BLL.DTOs.LetterDTOs;
using API.BLL.Mappers;
using API.BLL.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using API.BLL.DTOs.SpamSTOs;
using API.DAL.Entities;
using Microsoft.AspNetCore.Mvc.RazorPages;
using API.BLL.Helpers;
using System.Linq;

namespace API.BLL.Services.Implementations;

public class MailService : IMailService
{
    private readonly ILetterRepository _letterRepository;
    private readonly IUserRepository _userRepository;
    private readonly UserManager<User> _userManager;    
    private readonly ISpamRepository _spamRepository;
    private readonly ICacheService _cacheService;

    public MailService(
        ILetterRepository letterRepository,
        IUserRepository userRepository,
         UserManager<User> userManager,
         ISpamRepository spamRepository,
         ICacheService cacheService)
    {
        _letterRepository = letterRepository;
        _userRepository = userRepository;
        _userManager = userManager;
        _spamRepository = spamRepository;
        _cacheService = cacheService;
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

    public async Task<IEnumerable<DisplayLetterDto>> LoadInboxAsync(CacheKey cacheKey)
    {
        IQueryable<DisplayLetterDto>? inbox = (IQueryable<DisplayLetterDto>?)_cacheService.Get(cacheKey);

        if (inbox != null)
            return inbox;

        var user = await _userRepository.GetByIdAsync(cacheKey.UserId);
        IQueryable<Letter> letters = await _letterRepository.GetAllAsync();
        IQueryable<Spam> spams = await _spamRepository.GetAllAsync();

        var spammers = spams
            .Where(s => s.ReceiverId == cacheKey.UserId)
            .Select(s => s.SenderId);

        inbox = letters
            .Where(l => l.ReceiverId == cacheKey.UserId && !l.IsDeletedByReceiver && !spammers.Contains(l.SenderId))
            .Include(l => l.Sender)
            .Include(l => l.Receiver)
            .OrderByDescending(l => l.Date)   
            .Skip((cacheKey.Page - 1) * cacheKey.PageSize)
            .Take(cacheKey.PageSize)
            .Select(l => l.ToDisplayLetterDto());

        _cacheService.Set(cacheKey, inbox);

        return inbox;
    }

    public async Task<IEnumerable<DisplayLetterDto>> LoadSentAsync(CacheKey cacheKey)
    {
        var user = await _userRepository.GetByIdAsync(cacheKey.UserId);
        IQueryable<Letter> letters = await _letterRepository.GetAllAsync();

        var sent = letters
            .Where(l => l.SenderId == cacheKey.UserId && !l.IsDeletedBySender)
            .Include(l => l.Sender)
            .Include(l => l.Receiver)
            .OrderByDescending(l => l.Date)
            .Skip((cacheKey.Page - 1) * cacheKey.PageSize)
            .Take(cacheKey.PageSize)
            .Select(l => l.ToDisplayLetterDto());

        return sent;
    }

    public async Task<IEnumerable<DisplayLetterDto>> LoadBinAsync(CacheKey cacheKey)
    {
        var user = await _userRepository.GetByIdAsync(cacheKey.UserId);
        IQueryable<Letter> letters = await _letterRepository.GetAllAsync();

        var bin = letters
            .Where(l => 
            (l.SenderId == cacheKey.UserId || l.ReceiverId == cacheKey.UserId)
            && (l.IsDeletedByReceiver || l.IsDeletedBySender))
            .Include(l => l.Sender)
            .Include(l => l.Receiver)
            .OrderByDescending(l => l.Date)
            .Skip((cacheKey.Page - 1) * cacheKey.PageSize)
            .Take(cacheKey.PageSize)
            .Select(l => l.ToDisplayLetterDto());

        return bin;
    }

    public async Task<IEnumerable<DisplayLetterDto>> LoadSpamAsync(CacheKey cacheKey)
    {
        var user = await _userRepository.GetByIdAsync(cacheKey.UserId);
        IQueryable<Spam> spams = await _spamRepository.GetAllAsync();
        IQueryable<Letter> letters = await _letterRepository.GetAllAsync();

        var spammers = spams
            .Where(s => s.ReceiverId == cacheKey.UserId)
            .Select(s => s.SenderId);

        var spam = letters
            .Where(l => l.ReceiverId == cacheKey.UserId && spammers.Contains(l.SenderId))
            .Include(l => l.Sender)
            .Include(l => l.Receiver)
            .OrderByDescending(l => l.Date)
            .Skip((cacheKey.Page - 1) * cacheKey.PageSize)
            .Take(cacheKey.PageSize)
            .Select(l => l.ToDisplayLetterDto());
            
        return spam;
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

    public async Task AddToSpamAsync(SpamDto spamDto)
    {
        await _spamRepository.CreateAsync(spamDto.ToSpamTable());
    }

    public async Task RemoveFromSpamAsync(SpamDto spamDto)
    {
        var spamRow = await _spamRepository
            .GetByMembersIdAsync(spamDto.ReceiverId, spamDto.SenderId);
        await _spamRepository.DeleteAsync(spamRow!);
    }
}
