using SaaSAgent.Domain.Enums;

namespace SaaSAgent.Domain.Entities;

public sealed class Agent : BaseEntity
{
    public Guid TenantId { get; set; }
    public Tenant Tenant { get; set; } = null!;
    public string AgentName { get; set; } = string.Empty;
    public string TargetUserEmail { get; set; } = string.Empty;
    public string TargetUserDisplayName { get; set; } = string.Empty;
    public string PersonalityProfile { get; set; } = string.Empty;
    public AgentStatus Status { get; set; } = AgentStatus.Learning;
    public string ActiveChannels { get; set; } = "[]";
    public DateTime? LastActivityAt { get; set; }
    public ICollection<Interaction> Interactions { get; set; } = new List<Interaction>();
}
