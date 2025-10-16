using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaaSAgent.Domain.Entities;

namespace SaaSAgent.Infrastructure.Persistence.Configurations;

public sealed class AgentConfiguration : IEntityTypeConfiguration<Agent>
{
    public void Configure(EntityTypeBuilder<Agent> builder)
    {
        builder.ToTable("agents");
        builder.HasKey(a => a.Id);
        builder.Property(a => a.AgentName).IsRequired().HasMaxLength(150);
        builder.Property(a => a.TargetUserEmail).IsRequired().HasMaxLength(200);
        builder.Property(a => a.TargetUserDisplayName).IsRequired().HasMaxLength(200);
        builder.Property(a => a.PersonalityProfile).HasColumnType("jsonb");
        builder.Property(a => a.ActiveChannels).HasColumnType("jsonb");
        builder.Property(a => a.Status).HasConversion<int>();
        builder.HasMany(a => a.Interactions).WithOne(i => i.Agent).HasForeignKey(i => i.AgentId);
    }
}
