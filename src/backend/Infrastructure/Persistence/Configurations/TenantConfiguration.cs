using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaaSAgent.Domain.Entities;

namespace SaaSAgent.Infrastructure.Persistence.Configurations;

public sealed class TenantConfiguration : IEntityTypeConfiguration<Tenant>
{
    public void Configure(EntityTypeBuilder<Tenant> builder)
    {
        builder.ToTable("tenants");
        builder.HasKey(t => t.Id);
        builder.Property(t => t.CompanyName).IsRequired().HasMaxLength(200);
        builder.Property(t => t.Domain).IsRequired().HasMaxLength(150);
        builder.Property(t => t.MicrosoftTenantId).IsRequired().HasMaxLength(100);
        builder.Property(t => t.SubscriptionTier).HasConversion<int>();
        builder.Property(t => t.SubscriptionStatus).HasConversion<int>();
        builder.HasMany(t => t.Users).WithOne(u => u.Tenant).HasForeignKey(u => u.TenantId);
        builder.HasMany(t => t.Agents).WithOne(a => a.Tenant).HasForeignKey(a => a.TenantId);
    }
}
