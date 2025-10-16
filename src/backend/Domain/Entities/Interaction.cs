using SaaSAgent.Domain.Enums;

namespace SaaSAgent.Domain.Entities;

public sealed class Interaction : BaseEntity
{
    public Guid AgentId { get; set; }
    public Agent Agent { get; set; } = null!;
    public Guid TenantId { get; set; }
    public Tenant Tenant { get; set; } = null!;
    public InteractionType InteractionType { get; set; }
    public int TokensUsed { get; set; }
    public string Channel { get; set; } = string.Empty;
}
