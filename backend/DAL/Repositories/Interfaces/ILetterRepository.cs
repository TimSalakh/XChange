using DAL.Models;

namespace DAL.Repositories.Interfaces;

public interface ILetterRepository
{
    Task<Letter?> GetByIdAsync(Guid id);
    IQueryable<Letter> GetAll();
    Task CreateAsync(Letter letter);
    Task DeleteAsync(Letter letter);
}
