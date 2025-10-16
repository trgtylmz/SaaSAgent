namespace SaaSAgent.Domain.Entities;

public sealed class MicrosoftConnection : BaseEntity
{
    public Guid TenantId { get; set; }
    public Tenant Tenant { get; set; } = null!;
    public string AccessToken { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
    public DateTime ExpiresAt { get; set; }
    public string Scopes { get; set; } = string.Empty;
}
