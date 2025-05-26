using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using NoteKeeperAPI.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteKeeperAPI.Persistence
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<NoteKeeperAPIDbContext>
    {
        public NoteKeeperAPIDbContext CreateDbContext(string[] args)
        {
            ConfigurationManager configuration = new ConfigurationManager();
            configuration.SetBasePath(Path.Combine(Directory.GetCurrentDirectory(),"../../Presentation/NoteKeeperAPI.API"));
            configuration.AddJsonFile("appsettings.json");

            DbContextOptionsBuilder<NoteKeeperAPIDbContext> dbContextOptionsBuilder = new();
            dbContextOptionsBuilder.UseNpgsql(Configuration.ConnectionString);

            return new NoteKeeperAPIDbContext(dbContextOptionsBuilder.Options);

        }
    }
}
