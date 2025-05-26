using NoteKeeperAPI.Application.Repositories;
using NoteKeeperAPI.Application.Repositories.Notes;
using NoteKeeperAPI.Domain.Entities;
using NoteKeeperAPI.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteKeeperAPI.Persistence.Repositories.Notes
{
    public class NotesWriteRepository : WriteRepository<Note>, INotesWriteRepository
    {
        public NotesWriteRepository(NoteKeeperAPIDbContext context) : base(context)
        {
        }
    }
}
