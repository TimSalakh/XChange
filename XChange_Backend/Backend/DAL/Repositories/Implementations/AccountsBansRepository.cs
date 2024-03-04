using DAL.Entities.Models;
using Microsoft.EntityFrameworkCore;
using DAL.Entities.Contexts;
using DAL.Repositories.Abstractions;

namespace DAL.Repositories.Implementations;

public class AccountsBansRepository : BaseRepository<AccountsBans>
{
    public AccountsBansRepository(XChangeDbContext context) : base(context) { }

    public async Task DeleteAsync(string accountEmail, int banId)
    {
        var accountsBans = await _context.AccountsBans
            .FirstOrDefaultAsync(ab => ab.AccountEmail == accountEmail
            && ab.BanId == banId);
        if (accountsBans == null) return;
        _context.AccountsBans.Remove(accountsBans);
        await _context.SaveChangesAsync();
    }

    public override async Task DeleteAsync(int id) =>
        await Task.CompletedTask;

    public async Task<AccountsBans?> GetByIdAsync(string accountEmail, int banId) =>
    await _context.AccountsBans
    .FirstOrDefaultAsync(ab => ab.AccountEmail == accountEmail
            && ab.BanId == banId);

    public override async Task<AccountsBans?> GetByIdAsync<T>(T id) =>
        await Task.FromResult<AccountsBans>(null!);

    public override async Task UpdateAsync(AccountsBans entity) =>
        await Task.CompletedTask;
}
