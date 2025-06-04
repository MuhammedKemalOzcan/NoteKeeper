using NoteKeeperAPI.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteKeeperAPI.Domain.Entities
{
    public class Note : BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsArchived { get; set; } = false;
    }
}
