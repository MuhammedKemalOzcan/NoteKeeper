using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NoteKeeperAPI.Domain.Entities;
using NoteKeeperAPI.Domain.Entities.Common;
using NoteKeeperAPI.Domain.Entities.Identity;
using NoteKeeperAPI.Domain.EntityConfiguration;
using System.Reflection.Emit;

namespace NoteKeeperAPI.Persistence.Contexts
{
    public class NoteKeeperAPIDbContext : IdentityDbContext<AppUser,AppRole,string>
    {
        public NoteKeeperAPIDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Note> Notes { get; set; }
        public DbSet<Tag> Tags { get; set; }


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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new NoteConfiguration() );

            builder.Entity<NoteTag>()
            .HasKey(nt => new { nt.NoteId, nt.TagId });

            builder.Entity<NoteTag>()
                .HasOne(nt => nt.Note)
                .WithMany(n => n.NoteTags)
                .HasForeignKey(nt => nt.NoteId);

            builder.Entity<NoteTag>()
                .HasOne(nt => nt.Tag)
                .WithMany(t => t.NoteTags)
                .HasForeignKey(nt => nt.TagId);

            builder.Entity<Tag>()
        .HasIndex(t => new { t.TagName, t.UserId })
        .IsUnique()
        .HasDatabaseName("IX_Tags_TagName_UserId_Unique");

            builder.Entity<Tag>()
            .HasMany(t => t.NoteTags)
            .WithOne(nt => nt.Tag)
            .HasForeignKey(nt => nt.TagId)
            .OnDelete(DeleteBehavior.Cascade);





        }


    }
}
