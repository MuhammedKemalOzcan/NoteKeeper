using NoteKeeperAPI.Application.DTO;
using NoteKeeperAPI.Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteKeeperAPI.Application.Abstraction
{
    public interface ITokenHandler
    {
        Token CreateAccessToken(AppUser user,int minute);
    }
}
