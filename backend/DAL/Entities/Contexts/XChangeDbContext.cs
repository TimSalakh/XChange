using DAL.Entities.Configurations;
using DAL.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL.Entities.Contexts;

public class XChangeDbContext : DbContext
{
    public DbSet<Account> Accounts { get; set; } = null!;

    public XChangeDbContext(DbContextOptions<XChangeDbContext> options)
        : base(options) { }

    public XChangeDbContext()
    { }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=localhost;" +
           "Database=XChange;" +
           "TrustServerCertificate=True;" +
           "Trusted_Connection=True;");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new AccountConfiguration());
    }
}
