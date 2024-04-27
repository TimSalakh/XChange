using API.DAL.Entites;
using API.DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using API.BLL.DTOs.LetterDTOs;
using API.BLL.Mappers;
using API.BLL.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using API.BLL.DTOs.SpamSTOs;
using API.DAL.Entities;
using System.Linq.Expressions;

namespace API.BLL.Services.Implementations;

public class MailService : IMailService
{
    private readonly ILetterRepository _letterRepository;
    private readonly IUserRepository _userRepository;
    private readonly UserManager<User> _userManager;    
    private readonly ISpamRepository _spamRepository;
    private readonly IQueryService _queryService;

    public MailService(
        ILetterRepository letterRepository,
        IUserRepository userRepository,
         UserManager<User> userManager,
         ISpamRepository spamRepository,
         IQueryService queryService)
    {
        _letterRepository = letterRepository;
        _userRepository = userRepository;
        _userManager = userManager;
        _spamRepository = spamRepository;
        _queryService = queryService;
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

    public async Task<IEnumerable<DisplayLetterDto>?> LoadInboxAsync(Guid userId, string option)
    {
        var spammers = await _queryService.GetUsersSpammersAsync(userId);
        var (optionalFilter, orderBy) = _queryService.DefineOption(option); 

        var inboxFilters = new List<Expression<Func<Letter, bool>>>
        {
            l => l.ReceiverId == userId, 
            l => !l.IsDeletedByReceiver,
            l => !spammers!.Contains(l.SenderId)
        };

        if (optionalFilter != null)
            inboxFilters.Add(optionalFilter);

        return await _queryService.GetUsersLettersAsync(inboxFilters, orderBy);
    }

    public async Task<IEnumerable<DisplayLetterDto>?> LoadSentAsync(Guid userId, string option)
    {
        var (optionalFilter, orderBy) = _queryService.DefineOption(option);

        var sentFilters = new List<Expression<Func<Letter, bool>>>
        {
            l => l.SenderId == userId,
            l => !l.IsDeletedBySender,
        };

        if (optionalFilter != null)
            sentFilters.Add(optionalFilter);

        return await _queryService.GetUsersLettersAsync(sentFilters, orderBy);
    }

    public async Task<IEnumerable<DisplayLetterDto>?> LoadBinAsync(Guid userId, string option)
    {
        var (optionalFilter, orderBy) = _queryService.DefineOption(option);

        var binFilters = new List<Expression<Func<Letter, bool>>>
        {
            l => l.SenderId == userId || l.ReceiverId == userId,
            l => l.IsDeletedByReceiver || l.IsDeletedBySender
        };

        if (optionalFilter != null)
            binFilters.Add(optionalFilter);

        return await _queryService.GetUsersLettersAsync(binFilters, orderBy);
    }

    public async Task<IEnumerable<DisplayLetterDto>?> LoadSpamAsync(Guid userId, string option)
    {
        var spammers = await _queryService.GetUsersSpammersAsync(userId);
        var (optionalFilter, orderBy) = _queryService.DefineOption(option);

        var spamFilters = new List<Expression<Func<Letter, bool>>>
        {
            l => l.ReceiverId == userId,
            l => !l.IsDeletedByReceiver,
            l => spammers!.Contains(l.SenderId)
        };

        if (optionalFilter != null)
            spamFilters.Add(optionalFilter);

        return await _queryService.GetUsersLettersAsync(spamFilters, orderBy);
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
