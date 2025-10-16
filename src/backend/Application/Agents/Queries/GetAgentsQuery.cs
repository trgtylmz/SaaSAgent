using SaaSAgent.Domain.Entities;

namespace SaaSAgent.Application.Agents.Queries;

public sealed record GetAgentsQuery(string? Search, string? Status, string? Sort);

public sealed record AgentSummaryDto(
    Guid Id,
    string AgentName,
    string TargetUserDisplayName,
    string Status,
    DateTime CreatedAt,
    DateTime? LastActivityAt
)
{
    public static AgentSummaryDto FromEntity(Agent agent) => new(
        agent.Id,
        agent.AgentName,
        agent.TargetUserDisplayName,
        agent.Status.ToString(),
        agent.CreatedAt,
        agent.LastActivityAt
    );
}
