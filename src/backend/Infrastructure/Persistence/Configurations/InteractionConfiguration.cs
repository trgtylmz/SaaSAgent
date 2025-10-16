using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaaSAgent.Domain.Entities;

namespace SaaSAgent.Infrastructure.Persistence.Configurations;

public sealed class InteractionConfiguration : IEntityTypeConfiguration<Interaction>
{
    public void Configure(EntityTypeBuilder<Interaction> builder)
    {
        builder.ToTable("interactions");
        builder.HasKey(i => i.Id);
        builder.Property(i => i.Channel).IsRequired().HasMaxLength(100);
        builder.Property(i => i.InteractionType).HasConversion<int>();
    }
}
