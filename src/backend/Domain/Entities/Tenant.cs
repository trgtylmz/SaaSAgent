using SaaSAgent.Domain.Enums;

namespace SaaSAgent.Domain.Entities;

public sealed class Tenant : BaseEntity
{
    public string CompanyName { get; set; } = string.Empty;
    public string Domain { get; set; } = string.Empty;
    public string MicrosoftTenantId { get; set; } = string.Empty;
    public SubscriptionTier SubscriptionTier { get; set; } = SubscriptionTier.Free;
    public string? StripeCustomerId { get; set; }
    public SubscriptionStatus SubscriptionStatus { get; set; } = SubscriptionStatus.Trial;
    public DateTime? TrialEndsAt { get; set; }
    public ICollection<User> Users { get; set; } = new List<User>();
    public ICollection<Agent> Agents { get; set; } = new List<Agent>();
    public ICollection<Subscription> Subscriptions { get; set; } = new List<Subscription>();
    public MicrosoftConnection? MicrosoftConnection { get; set; }
}
