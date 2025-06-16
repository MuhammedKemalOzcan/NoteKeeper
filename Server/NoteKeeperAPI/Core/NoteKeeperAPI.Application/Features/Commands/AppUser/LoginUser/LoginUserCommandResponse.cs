using NoteKeeperAPI.Application.DTO;
using NoteKeeperAPI.Application.DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteKeeperAPI.Application.Features.Commands.AppUser.LoginUser
{
    public class LoginUserCommandResponse
    {
        public Token Token { get; set; }
        public UserDto User { get; set; }

    }
}
