using API.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.DAL.Configurations;

public class SpamConfiguration : IEntityTypeConfiguration<Spam>
{
    public void Configure(EntityTypeBuilder<Spam> builder)
    {
        builder.HasKey(s => s.Id);

        builder
            .HasOne(s => s.Receiver)
            .WithMany()
            .HasForeignKey(s => s.ReceiverId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(s => s.Sender)
            .WithMany()
            .HasForeignKey(s => s.SenderId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
