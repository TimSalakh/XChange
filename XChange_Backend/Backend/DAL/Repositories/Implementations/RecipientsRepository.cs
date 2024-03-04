using Microsoft.EntityFrameworkCore;
using DAL.Entities.Contexts;
using DAL.Entities.Models;
using DAL.Repositories.Abstractions;

namespace DAL.Repositories.Implementations;

public class RecipientsRepository : BaseRepository<Recipients>
{
    public RecipientsRepository(XChangeDbContext context) : base(context) { }

    public async Task DeleteAsync(string accountEmail, Guid letterId)
    {
        var recipient = await _context.Recipients
            .FirstOrDefaultAsync(r => r.AccountEmail == accountEmail
            && r.LetterId == letterId);
        if (recipient == null) return;
        _context.Recipients.Remove(recipient);
        await _context.SaveChangesAsync();
    }

    public override async Task DeleteAsync(int id) =>
        await Task.CompletedTask;

    public async Task<Recipients?> GetByIdAsync(string accountEmail, Guid letterId) =>
    await _context.Recipients
    .FirstOrDefaultAsync(r => r.AccountEmail == accountEmail
            && r.LetterId == letterId);

    public override async Task<Recipients?> GetByIdAsync<T>(T id) =>
        await Task.FromResult<Recipients>(null!);

    public override async Task UpdateAsync(Recipients entity) =>
        await Task.CompletedTask;
}
