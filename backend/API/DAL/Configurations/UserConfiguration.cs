using API.DAL.Entites;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.DAL.Configurations;

internal class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder
            .HasMany(u => u.Sent)
            .WithOne(l => l.Sender);

        builder
            .HasMany(u => u.Received)
            .WithOne(l => l.Receiver);
    }
}
