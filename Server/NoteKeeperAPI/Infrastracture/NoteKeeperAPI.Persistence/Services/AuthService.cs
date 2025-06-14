using Microsoft.AspNetCore.Identity;
using NoteKeeperAPI.Application.Abstraction;
using NoteKeeperAPI.Application.Abstraction.Services;
using NoteKeeperAPI.Application.DTO;
using NoteKeeperAPI.Application.Exceptions;
using NoteKeeperAPI.Domain.Entities.Identity;

namespace NoteKeeperAPI.Persistence.Services
{
    public class AuthService : IAuthService
    {
        readonly UserManager<AppUser> _userManager;
        readonly SignInManager<AppUser> _signInManager;
        readonly ITokenHandler _tokenHandler;

        public AuthService(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenHandler tokenHandler)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenHandler = tokenHandler;
        }

        public async Task<Token> LoginAsync(string usernameOrEmail, string password, int accessTokenLifeTime)
        {
            AppUser user = await _userManager.FindByNameAsync(usernameOrEmail);
            if (user == null)
                user = await _userManager.FindByEmailAsync(usernameOrEmail);

            if (user == null)
                throw new Exception("Kullanıcı adı veya şifre hatalı.");

            //User şifreyle doğrulanıyor mu kontrol et.
            SignInResult result = await _signInManager.CheckPasswordSignInAsync(user, password, false);
            if (result.Succeeded)
            {
                Token token = _tokenHandler.CreateAccessToken(user,accessTokenLifeTime);
                return token;
            }
            throw new AuthenticationErrorExceptions();
        }
    }
}
