using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using SaaSAgent.Application.Common.Interfaces;

namespace SaaSAgent.Infrastructure.Identity;

public sealed class CurrentUserService(IHttpContextAccessor httpContextAccessor) : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;

    public Guid UserId => GetGuidClaim(ClaimTypes.NameIdentifier);
    public Guid TenantId => GetGuidClaim("tenant_id");
    public string Email => _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.Email) ?? string.Empty;

    private Guid GetGuidClaim(string claimType)
    {
        var claimValue = _httpContextAccessor.HttpContext?.User?.FindFirstValue(claimType);
        return Guid.TryParse(claimValue, out var value) ? value : Guid.Empty;
    }
}
