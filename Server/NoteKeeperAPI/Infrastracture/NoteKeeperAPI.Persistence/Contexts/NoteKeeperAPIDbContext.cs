using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NoteKeeperAPI.Domain.Entities;
using NoteKeeperAPI.Domain.Entities.Common;
using NoteKeeperAPI.Domain.Entities.Identity;

namespace NoteKeeperAPI.Persistence.Contexts
{
    public class NoteKeeperAPIDbContext : IdentityDbContext<AppUser,AppRole,string>
    {
        public NoteKeeperAPIDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Note> Notes { get; set; }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var datas = ChangeTracker.Entries<BaseEntity>();

            foreach (var data in datas)
            {
                _ = data.State switch
                {
                    EntityState.Added => data.Entity.CreatedDate = DateTime.UtcNow,
                    EntityState.Modified => data.Entity.UpdatedDate = DateTime.UtcNow,
                    _ => default
                };
            }
            return await base.SaveChangesAsync(cancellationToken);

        }


    }
}
