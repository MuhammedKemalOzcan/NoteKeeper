using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteKeeperAPI.Domain.Entities.Identity
{
    public class AppUser : IdentityUser<string>
    {
        public ICollection<Note> Notes { get; set; } = new List<Note>();
    }
}
