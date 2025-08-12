using NoteKeeperAPI.Domain.Entities.Common;
using NoteKeeperAPI.Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteKeeperAPI.Domain.Entities
{
    public class Tag : BaseEntity
    {
        public string TagName { get; set; }
        public string UserId { get; set; }
        public AppUser User { get; set; }
        public ICollection<NoteTag> NoteTags { get; set; } = new List<NoteTag>();
    }
}
