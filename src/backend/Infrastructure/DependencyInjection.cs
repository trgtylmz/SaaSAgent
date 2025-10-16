using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SaaSAgent.Application.Common.Interfaces;
using SaaSAgent.Infrastructure.Persistence;

namespace SaaSAgent.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("Database")
            ?? throw new InvalidOperationException("Database connection string is missing.");

        services.AddDbContext<AppDbContext>(options =>
        {
            options.UseNpgsql(connectionString, builder =>
            {
                builder.MigrationsAssembly(typeof(AppDbContext).Assembly.FullName);
            });
        });

        services.AddHttpContextAccessor();
        services.AddScoped<ICurrentUserService, Identity.CurrentUserService>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        return services;
    }
}
