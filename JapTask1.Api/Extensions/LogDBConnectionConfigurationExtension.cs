using JapTask1.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace JapTask1.Api.Extensions
{
    public static class LogDBConnectionConfigurationExtension
    {
        public static void AddLogDBConnection(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<LogDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("LogDatabaseConnectionString")));
        }
    }
}
