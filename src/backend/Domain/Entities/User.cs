using SaaSAgent.Domain.Enums;

namespace SaaSAgent.Domain.Entities;

public sealed class User : BaseEntity
{
    public Guid TenantId { get; set; }
    public Tenant Tenant { get; set; } = null!;
    public string MicrosoftUserId { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public UserRole Role { get; set; } = UserRole.User;
}
