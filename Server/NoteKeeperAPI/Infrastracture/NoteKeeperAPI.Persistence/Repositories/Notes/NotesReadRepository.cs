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
    public class NotesReadRepository : ReadRepository<Note>, INotesReadRepository
    {
        public NotesReadRepository(NoteKeeperAPIDbContext context) : base(context)
        {
        }
    }
}
