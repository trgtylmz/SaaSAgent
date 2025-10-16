using SaaSAgent.Domain.Entities;

namespace SaaSAgent.Application.Common.Interfaces;

public interface IUnitOfWork : IAsyncDisposable
{
    IRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity;
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
