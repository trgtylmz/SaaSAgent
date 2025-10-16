# SaaSAgent

SaaSAgent is a multi-tenant B2B SaaS platform for creating and managing AI-powered executive digital twins that integrate deeply with Microsoft 365 and Microsoft Teams. The project follows a clean architecture approach with separate Domain, Application, Infrastructure, and API layers alongside an Angular front-end (to be scaffolded).

## Repository Structure

```
.
├── README.md
└── src
    ├── backend
    │   ├── API                  # ASP.NET Core 8 Web API project (presentation layer)
    │   ├── Application          # Application layer contracts and DTOs
    │   ├── Domain               # Core domain entities and enums
    │   ├── Infrastructure       # EF Core persistence, identity, DI setup
    │   └── SaaSAgent.sln        # Solution referencing all backend projects
    └── frontend                 # Angular 17 + Tailwind CSS SaaS experience
        ├── package.json         # Front-end dependencies & scripts
        └── src                  # Standalone component based UI implementation
```

## Backend Highlights

- **ASP.NET Core 8.0** Web API configured with Microsoft Identity platform authentication via `Microsoft.Identity.Web` and JWT Bearer tokens.
- **Entity Framework Core** with PostgreSQL provider and strongly-typed configurations for all entities (tenants, users, agents, interactions, Microsoft connections, subscriptions).
- **Clean Architecture** layering with reusable repository/unit of work abstractions and infrastructure implementations.
- **Serilog** console logging configuration included in `appsettings.json` for structured diagnostics.
- **Multi-tenant ready** domain model capturing tenant isolation, subscription tiers, and role-based user assignments.

## Getting Started

> **Prerequisites**
> - .NET SDK 8.0+
> - PostgreSQL 15+
> - Node.js 18+ (for the Angular front-end scaffold)

1. Navigate to the backend directory:
   ```bash
   cd src/backend
   ```
2. Restore dependencies and build the solution:
   ```bash
   dotnet restore
   dotnet build
   ```
3. Apply Entity Framework Core migrations (to be added):
   ```bash
   dotnet ef database update
   ```
4. Run the API project:
   ```bash
   dotnet run --project API/SaaSAgent.Api.csproj
   ```

The API uses `appsettings.json` for configuration. Set the following environment variables or user secrets for secure deployments:

- `ConnectionStrings__Database`
- `AzureAd__ClientId`
- `AzureAd__ClientSecret`
- `AzureAd__TenantId`

## Next Steps

- Scaffold the Angular 17 front-end with Tailwind CSS, Angular Material/PrimeNG, and MSAL.js integration.
- Implement command/query handlers, validation, and background services in the Application layer.
- Add persistence migrations, seed data, and comprehensive API controllers for onboarding, agents, billing, and usage management.
- Integrate Stripe for subscription billing and Microsoft Graph for organizational data access.

## License

Proprietary – All rights reserved.
