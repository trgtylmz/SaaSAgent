using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using SaaSAgent.Application.Common.Interfaces;
using SaaSAgent.Domain.Entities;

namespace SaaSAgent.Infrastructure.Persistence.Repositories;

public class Repository<TEntity>(AppDbContext context) : IRepository<TEntity>
    where TEntity : BaseEntity
{
    protected AppDbContext Context { get; } = context;

    public async Task<TEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await Context.Set<TEntity>().FindAsync([id], cancellationToken);
    }

    public async Task<IReadOnlyList<TEntity>> ListAsync(Expression<Func<TEntity, bool>>? predicate = null, CancellationToken cancellationToken = default)
    {
        IQueryable<TEntity> query = Context.Set<TEntity>();
        if (predicate is not null)
        {
            query = query.Where(predicate);
        }

        return await query.ToListAsync(cancellationToken);
    }

    public async Task AddAsync(TEntity entity, CancellationToken cancellationToken = default)
    {
        await Context.Set<TEntity>().AddAsync(entity, cancellationToken);
    }

    public void Update(TEntity entity)
    {
        Context.Set<TEntity>().Update(entity);
    }

    public void Delete(TEntity entity)
    {
        Context.Set<TEntity>().Remove(entity);
    }
}
