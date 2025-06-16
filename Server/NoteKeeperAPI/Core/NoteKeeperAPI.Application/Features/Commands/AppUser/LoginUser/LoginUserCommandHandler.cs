using MediatR;
using Microsoft.AspNetCore.Identity;
using NoteKeeperAPI.Application.Abstraction.Services;
using NoteKeeperAPI.Application.DTO;
using NoteKeeperAPI.Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteKeeperAPI.Application.Features.Commands.AppUser.LoginUser
{
    public class LoginUserCommandHandler : IRequestHandler<LoginUserCommandRequest, LoginUserCommandResponse>
    {

        readonly IAuthService _authService;

        public LoginUserCommandHandler(IAuthService authService)
        {
            _authService = authService;
        }

        public async Task<LoginUserCommandResponse> Handle(LoginUserCommandRequest request, CancellationToken cancellationToken)
        {
            var token = await _authService.LoginAsync(request.UsernameOrEmail, request.Password, 15);

            return new()
            {
                Token = token,
                User = new DTO.User.UserDto
                {
                    Username = request.UsernameOrEmail,
                }
            };

        }
    }
}
