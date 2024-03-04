using Microsoft.EntityFrameworkCore;
using DAL.Entities.Contexts;
using DAL.Entities.Models;
using DAL.Repositories.Abstractions;

namespace TestConsole.Repositories;

public class LettersRepositories : BaseRepository<Letters>
{
    public LettersRepositories(XChangeDbContext context) : base(context) { }

    public async Task<Letters?> GetByIdAsync(Guid id) =>
        await _context.Letters.FirstOrDefaultAsync(l => l.Id == id);

    public async Task<IEnumerable<Letters?>> GetAllBySenderAsync(string senderEmail) =>
        await _context.Letters
        .Where(l => l.SenderEmail == senderEmail)
        .ToListAsync();

    public async Task<IEnumerable<Letters?>> GetAllByRecipientAsync(string recipientEmail) =>
        await _context.Letters
            .Where(l => _context.Recipients
                            .Where(r => r.AccountEmail == recipientEmail)
                            .Select(r => r.LetterId)
                            .Contains(l.Id))
            .ToListAsync();
}
