using API.DAL.Entities;

namespace API.DAL.Repositories.Interfaces;

public interface ISpamRepository
{
    Task<Spam?> GetByMembersIdAsync(Guid receiverId, Guid senderId);
    Task<IQueryable<Spam>> GetAllAsync();
    Task CreateAsync(Spam spam);
    Task UpdateAsync(Spam spam);
    Task DeleteAsync(Spam spam);
}
