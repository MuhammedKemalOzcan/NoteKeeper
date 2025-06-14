using Microsoft.Extensions.DependencyInjection;
using NoteKeeperAPI.Application.Abstraction;
using NoteKeeperAPI.Infrastracture.Services.TokenConcrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteKeeperAPI.Infrastracture
{
    public static class ServiceRegistration
    {
        public static void AddInfrastructureServices(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped<ITokenHandler, TokenHandler>();
        }
    }
}
