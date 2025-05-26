using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NoteKeeperAPI.Application.Repositories.Notes;
using NoteKeeperAPI.Persistence.Contexts;
using NoteKeeperAPI.Persistence.Repositories.Notes;

namespace NoteKeeperAPI.Persistence
{
    public static class ServiceRegistration
    {
        public static void AddPersistenceServices(this IServiceCollection services)
        {
            services.AddDbContext<NoteKeeperAPIDbContext>(options =>
            {
                options.UseNpgsql(Configuration.ConnectionString);
            });

            services.AddScoped<INotesReadRepository, NotesReadRepository>();
            services.AddScoped<INotesWriteRepository, NotesWriteRepository>();
        }
    }
}
