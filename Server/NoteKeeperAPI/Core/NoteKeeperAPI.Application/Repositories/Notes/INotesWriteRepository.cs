using NoteKeeperAPI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteKeeperAPI.Application.Repositories.Notes
{
    public interface INotesWriteRepository : IWriteRepository<Note>
    {
    }
}
