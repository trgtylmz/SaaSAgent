using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaaSAgent.Domain.Entities;

namespace SaaSAgent.Infrastructure.Persistence.Configurations;

public sealed class SubscriptionConfiguration : IEntityTypeConfiguration<Subscription>
{
    public void Configure(EntityTypeBuilder<Subscription> builder)
    {
        builder.ToTable("subscriptions");
        builder.HasKey(s => s.Id);
        builder.Property(s => s.StripeSubscriptionId).IsRequired().HasMaxLength(200);
        builder.Property(s => s.StripePriceId).IsRequired().HasMaxLength(200);
        builder.Property(s => s.Status).IsRequired().HasMaxLength(100);
    }
}
