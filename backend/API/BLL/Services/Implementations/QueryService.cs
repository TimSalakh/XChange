using API.BLL.DTOs.LetterDTOs;
using API.BLL.Mappers;
using API.BLL.Services.Interfaces;
using API.DAL.Entites;
using API.DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace API.BLL.Services.Implementations;

public class QueryService : IQueryService
{
    private readonly ILetterRepository _letterRepository;
    private readonly ISpamRepository _spamRepository;

    public QueryService(
        ILetterRepository letterRepository,
         ISpamRepository spamRepository)
    {
        _letterRepository = letterRepository;
        _spamRepository = spamRepository;
    }


    public async Task<IEnumerable<DisplayLetterDto>?> GetUsersLettersAsync(
        IEnumerable<Expression<Func<Letter, bool>>>? filters = null, 
        Func<IQueryable<Letter>, IOrderedQueryable<Letter>>? orderBy = null)
    {
        var letters = await _letterRepository.GetAllAsync();

        if (filters != null) 
            letters = filters
                .Aggregate(letters, (current, filter) => current.Where(filter));

        if (orderBy != null)
            letters =  orderBy(letters);

        return letters
            .Include(l => l.Sender)
            .Include(l => l.Receiver)
            .Select(l => l.ToDisplayLetterDto());
    }

    public async Task<IQueryable<Guid>?> GetUsersSpammersAsync(Guid userId)
    {
        var spam = await _spamRepository.GetAllAsync();
        var spammers = spam
            .Where(s => s.ReceiverId == userId)
            .Select(s => s.SenderId);

        return spammers;
    }

    public (Expression<Func<Letter, bool>>?, Func<IQueryable<Letter>, IOrderedQueryable<Letter>>?) DefineOption(string option)
    {
        return option switch
        {
            "new" => (null, queryable => queryable.OrderByDescending(l => l.Date)),
            "old" => (null, queryable => queryable.OrderBy(l => l.Date)),
            "unread" => (l => !l.IsRead, queryable => queryable.OrderByDescending(l => l.Date)),
            "read" => (l => l.IsRead, queryable => queryable.OrderByDescending(l => l.Date)),
            _ => (null, null),
        };
    }
}
