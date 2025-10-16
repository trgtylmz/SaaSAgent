using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaaSAgent.Application.Agents.Queries;
using SaaSAgent.Application.Common.Interfaces;
using SaaSAgent.Domain.Entities;

namespace SaaSAgent.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public sealed class AgentsController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AgentSummaryDto>>> GetAgents([FromQuery] string? search, [FromQuery] string? status, [FromQuery] string? sort, CancellationToken cancellationToken)
    {
        var repository = _unitOfWork.Repository<Agent>();
        var agents = await repository.ListAsync(cancellationToken: cancellationToken);
        var summaries = agents.Select(AgentSummaryDto.FromEntity);
        return Ok(summaries);
    }
}
