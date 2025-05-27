using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteKeeperAPI.Application.DTO.Notes
{
    public class CreateNoteDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
