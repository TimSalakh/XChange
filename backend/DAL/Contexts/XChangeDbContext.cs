using DAL.Configurations;
using DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DAL.Contexts;

public class XChangeDbContext : 
    IdentityDbContext<User, Role, Guid>
{
    public DbSet<User> User { get; set; }
    public DbSet<Letter> Letter { get; set; }

    public XChangeDbContext(DbContextOptions<XChangeDbContext> options)
        : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfiguration(new UserConfiguration());
        builder.ApplyConfiguration(new LetterConfiguration());
    }
}
