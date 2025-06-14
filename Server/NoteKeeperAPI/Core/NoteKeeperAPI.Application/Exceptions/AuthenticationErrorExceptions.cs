using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace NoteKeeperAPI.Application.Exceptions
{
    public class AuthenticationErrorExceptions : Exception
    {
        public AuthenticationErrorExceptions()
        {
        }

        public AuthenticationErrorExceptions(string? message) : base(message)
        {
        }

        protected AuthenticationErrorExceptions(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
