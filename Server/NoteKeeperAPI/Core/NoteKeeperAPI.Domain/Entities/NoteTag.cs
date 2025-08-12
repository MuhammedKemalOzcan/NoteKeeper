using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteKeeperAPI.Domain.Entities
{
    public class NoteTag
    {
        public Guid NoteId { get; set; }
        public Note Note { get; set; }
        public Guid TagId { get; set; }
        public Tag Tag { get; set; }
    }
}
