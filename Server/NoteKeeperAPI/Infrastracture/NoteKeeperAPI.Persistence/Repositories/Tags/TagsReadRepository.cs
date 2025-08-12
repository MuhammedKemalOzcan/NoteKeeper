using NoteKeeperAPI.Application.Repositories.Tags;
using NoteKeeperAPI.Domain.Entities;
using NoteKeeperAPI.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteKeeperAPI.Persistence.Repositories.Tags
{
    public class TagsReadRepository : ReadRepository<Tag>, ITagsReadRepository
    {
        public TagsReadRepository(NoteKeeperAPIDbContext context) : base(context)
        {
        }
    }
}
