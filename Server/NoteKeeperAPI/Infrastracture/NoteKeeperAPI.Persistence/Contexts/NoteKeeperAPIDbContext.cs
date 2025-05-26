using Microsoft.EntityFrameworkCore;
using NoteKeeperAPI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteKeeperAPI.Persistence.Contexts
{
    public class NoteKeeperAPIDbContext : DbContext
    {
        public NoteKeeperAPIDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Note> Notes { get; set; }


    }
}
