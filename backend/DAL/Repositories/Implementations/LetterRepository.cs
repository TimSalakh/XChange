using DAL.Contexts;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories.Implementations;

public class LetterRepository : ILetterRepository
{
    private readonly XChangeDbContext _context;

    public LetterRepository(XChangeDbContext context)
    {
        _context = context;
    }

    public async Task CreateAsync(Letter letter)
    {
        await _context.Letter.AddAsync(letter);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Letter letter)
    {
        _context.Letter.Remove(letter);
        await _context.SaveChangesAsync();
    }

    public async Task<IQueryable<Letter>> GetAllAsync()
    {
        return await Task.Run(() =>
        {
            return _context.Letter
            .AsQueryable()
            .AsNoTracking();
        });
    }

    public async Task<Letter?> GetByIdAsync(Guid id)
    {
        return await _context.Letter
            .FirstOrDefaultAsync(l => l.Id == id);
    }
}
