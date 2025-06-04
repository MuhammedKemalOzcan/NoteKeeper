using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteKeeperAPI.Application.DTO.Notes
{
    public class PatchNoteDto
    {
        public string Id { get; set; }
        public bool IsArchived { get; set; }
    }
}
