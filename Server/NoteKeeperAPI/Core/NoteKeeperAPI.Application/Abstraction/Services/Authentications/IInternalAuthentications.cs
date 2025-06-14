using NoteKeeperAPI.Application.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteKeeperAPI.Application.Abstraction.Services.Authentications
{
    public interface IInternalAuthentications
    {
        Task<Token> LoginAsync(string usernameOrEmail, string password, int accessTokenLifeTime);
    }
}
