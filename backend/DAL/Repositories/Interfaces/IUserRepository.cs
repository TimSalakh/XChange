using API.DAL.Entites;

namespace API.DAL.Repositories.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByIdAsync(Guid id);
    Task<IQueryable<User>> GetAllAsync();
    Task CreateAsync(User user);
    Task DeleteAsync(User user);
}
