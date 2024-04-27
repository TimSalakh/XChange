using API.BLL.DTOs.LetterDTOs;
using API.DAL.Entites;
using System.Linq.Expressions;

namespace API.BLL.Services.Interfaces;

public interface IQueryService
{
    public Task<IEnumerable<DisplayLetterDto>?> GetUsersLettersAsync(
        IEnumerable<Expression<Func<Letter, bool>>>? filters = null, 
        Func<IQueryable<Letter>, IOrderedQueryable<Letter>>? orderBy = null);
    public Task<IQueryable<Guid>?> GetUsersSpammersAsync(Guid userId);
    public (Expression<Func<Letter, bool>>?, Func<IQueryable<Letter>, IOrderedQueryable<Letter>>?) DefineOption(string option);
}
