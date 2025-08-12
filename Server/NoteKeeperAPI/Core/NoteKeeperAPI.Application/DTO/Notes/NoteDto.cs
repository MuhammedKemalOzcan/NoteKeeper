using NoteKeeperAPI.Application.DTO.Tags;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteKeeperAPI.Application.DTO.Notes
{
    public class NoteDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsArchived { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public List<TagDto> Tags { get; set; }
    }
}
