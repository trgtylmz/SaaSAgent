using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaaSAgent.Domain.Entities;

namespace SaaSAgent.Infrastructure.Persistence.Configurations;

public sealed class MicrosoftConnectionConfiguration : IEntityTypeConfiguration<MicrosoftConnection>
{
    public void Configure(EntityTypeBuilder<MicrosoftConnection> builder)
    {
        builder.ToTable("microsoft_connections");
        builder.HasKey(mc => mc.Id);
        builder.Property(mc => mc.AccessToken).IsRequired();
        builder.Property(mc => mc.RefreshToken).IsRequired();
        builder.Property(mc => mc.Scopes).HasColumnType("jsonb");
        builder.HasOne(mc => mc.Tenant).WithOne(t => t.MicrosoftConnection).HasForeignKey<MicrosoftConnection>(mc => mc.TenantId);
    }
}
