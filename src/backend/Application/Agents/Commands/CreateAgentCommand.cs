using SaaSAgent.Domain.Entities;

namespace SaaSAgent.Application.Agents.Commands;

public sealed record CreateAgentCommand(
    string AgentName,
    string TargetUserEmail,
    string TargetUserDisplayName,
    IReadOnlyCollection<string> ActiveChannels,
    string? Description
);

public sealed record CreateAgentResult(Agent Agent, bool RequiresLearningPhase);
