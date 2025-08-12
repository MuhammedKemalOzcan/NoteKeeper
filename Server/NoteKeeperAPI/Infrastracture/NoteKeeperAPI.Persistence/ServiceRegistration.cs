using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NoteKeeperAPI.Application.Abstraction.Services;
using NoteKeeperAPI.Application.Repositories.Notes;
using NoteKeeperAPI.Application.Repositories.Tags;
using NoteKeeperAPI.Domain.Entities.Identity;
using NoteKeeperAPI.Persistence.Contexts;
using NoteKeeperAPI.Persistence.Repositories.Notes;
using NoteKeeperAPI.Persistence.Repositories.Tags;
using NoteKeeperAPI.Persistence.Services;

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

            services.AddIdentity<AppUser, AppRole>(options =>
            {
                options.Password.RequiredLength = 9;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.User.RequireUniqueEmail = true;
            })
                .AddEntityFrameworkStores<NoteKeeperAPIDbContext>()
                .AddDefaultTokenProviders();

            services.AddScoped<INotesReadRepository, NotesReadRepository>();
            services.AddScoped<INotesWriteRepository, NotesWriteRepository>();
            services.AddScoped<ITagsReadRepository, TagsReadRepository>();
            services.AddScoped<ITagsWriteRepository, TagsWriteRepository>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAuthService, AuthService>();
        }
    }
}
