using API.DAL.Contexts;
using API.DAL.Entites;
using Microsoft.EntityFrameworkCore;
using API.DAL.Repositories.Interfaces;

namespace API.DAL.Repositories.Implementations;

public class UserRepository : IUserRepository
{
    private readonly XChangeDbContext _context;

    public UserRepository(XChangeDbContext context)
    {
        _context = context;
    }

    public async Task CreateAsync(User user)
    {
        await _context.User.AddAsync(user);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(User user)
    {
        _context.User.Remove(user);
        await _context.SaveChangesAsync();
    }

    public async Task<IQueryable<User>> GetAllAsync()
    {
        return await Task.Run(() =>
        {
            return _context.User
            .AsQueryable()
            .AsNoTracking();
        });
    }

    public async Task<User?> GetByIdAsync(Guid id)
    {
        return await _context.User
            .FirstOrDefaultAsync(l => l.Id == id);
    }
}
