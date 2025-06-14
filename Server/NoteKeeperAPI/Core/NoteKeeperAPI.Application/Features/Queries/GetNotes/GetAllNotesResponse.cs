using NoteKeeperAPI.Application.DTO.Notes;
using NoteKeeperAPI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteKeeperAPI.Application.Features.Queries.GetNotes
{
    public class GetAllNotesResponse
    {
        public List<NoteDto> Notes { get; set; }
    }
}
