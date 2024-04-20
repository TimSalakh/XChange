using API.DAL.Contexts;
using API.DAL.Entities;
using API.DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.DAL.Repositories.Implementations;

public class SpamRepository : ISpamRepository
{
    private readonly XChangeDbContext _context;

    public SpamRepository(XChangeDbContext context)
    {
        _context = context;
    }

    public async Task CreateAsync(Spam spam)
    {
        await _context.AddAsync(spam);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Spam spam)
    {
         _context.Remove(spam);
        await _context.SaveChangesAsync();
    }

    public async Task<IQueryable<Spam>> GetAllAsync()
    {
        return await Task.Run(() =>
        {
            return _context.Spam
            .AsQueryable()
            .AsNoTracking();
        });
    }

    public async Task<Spam?> GetByMembersIdAsync(Guid receiverId, Guid senderId)
    {
        return await _context.Spam
            .Include(s => s.Receiver)
            .Include(s => s.Sender)
            .FirstOrDefaultAsync(s => 
            s.ReceiverId == receiverId 
            && s.SenderId == senderId);
    }

    public async Task UpdateAsync(Spam spam)
    {
        _context.Spam.Update(spam);
        await _context.SaveChangesAsync();
    }
}
