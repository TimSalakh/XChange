using DAL.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL.Entities.Contexts;

public class XChangeDbContext : DbContext
{
    public DbSet<Accounts> Accounts { get; set; } = null!;
    public DbSet<AccountsBans> AccountsBans { get; set; } = null!;
    public DbSet<Attachments> Attachments { get; set; } = null!;
    public DbSet<Bans> Bans { get; set; } = null!;
    public DbSet<Letters> Letters { get; set; } = null!;
    public DbSet<Recipients> Recipients { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) =>
    optionsBuilder.UseSqlServer(
        @"Server=localhost;
            Database=XChange;
            TrustServerCertificate=True;
            Trusted_Connection=True;");
}
