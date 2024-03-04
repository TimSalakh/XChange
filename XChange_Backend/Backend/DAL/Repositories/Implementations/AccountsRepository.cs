using DAL.Entities.Models;
using Microsoft.EntityFrameworkCore;
using DAL.Entities.Contexts;
using DAL.Repositories.Abstractions;

namespace DAL.Repositories.Implementations;

public class AccountsRepository : BaseRepository<Accounts>
{
    public AccountsRepository(XChangeDbContext context) : base(context) { }

    public async Task<Accounts?> GetByEmailAsync(string email) =>
        await _context.Accounts.FirstOrDefaultAsync(a => a.Email == email);
}
