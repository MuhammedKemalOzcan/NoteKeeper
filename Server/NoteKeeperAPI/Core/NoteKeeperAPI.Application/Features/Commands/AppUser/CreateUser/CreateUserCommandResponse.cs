using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteKeeperAPI.Application.Features.Commands.AppUser.CreateUser
{
    public class CreateUserCommandResponse
    {
        public bool Succeeded { get; set; } = true;
        public string Message { get; set; } = "Kullanıcı başarıyla oluşturuldu.";
    }
}
