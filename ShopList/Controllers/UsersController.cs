using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ShopList.DTO;
using ShopList.Models;
using ShopList.Repository;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ShopList
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMapper _mapper;
        private UserManager<User> _userManager;
        private SignInManager<User> _signInManager;
        private readonly ApplicationSettings _appSettings;
        private readonly RoleManager<Role> _roleManager;
        private AbstractCRUDCreator<UserAuthorisation, string> _userAuthorisationRepository;
        private AbstractCRUDCreator<UsersLoginHistory, int> _usersLoginHistoryRepository;

        public UsersController(IMapper mapper, UserManager<User> userManager, SignInManager<User> signInManager,
            IOptions<ApplicationSettings> appSettings, AbstractCRUDCreator<UserAuthorisation, string> userAuthorisationRepository,
            RoleManager<Role> roleManager, AbstractCRUDCreator<UsersLoginHistory, int> usersLoginHistoryRepository)
        {
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
            _userAuthorisationRepository = userAuthorisationRepository;
            _roleManager = roleManager;
            _usersLoginHistoryRepository = usersLoginHistoryRepository;
        }

        // GET: api/<UsersController>/ListOfUser
        [HttpGet("ListOfUser")]
        [Authorize]
        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            var adminRole = await _roleManager.FindByNameAsync(_appSettings.AdminRole);

            if (user.RoleName == adminRole.Id)
            {
                var userList = _userManager.Users.ToList();
                var userDTOList = userList.Select(user => _mapper.Map<UserProfileDTO>(user)).OrderBy(user => user.Name).ToList();
                return userDTOList;
            }
            return StatusCode(404);
        }

        // GET: api/<UsersController>/UserProfile/{userGuid}
        [HttpGet("UserProfile/{userGuid}")]
        [Authorize]
        public async Task<Object> UserProfile(string userGuid)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            var adminRole = await _roleManager.FindByNameAsync(_appSettings.AdminRole);

            if (user.RoleName == adminRole.Id)
            {
                var userProfile = await _userManager.FindByIdAsync(userGuid);
                var userProfileDTO = _mapper.Map<UserProfileDTO>(userProfile);
                return userProfileDTO;
            }
            return StatusCode(404);
        }

        // GET: api/<UsersController>/MyProfile
        [HttpGet("MyProfile")]
        [Authorize]
        public async Task<Object> MyUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            var userProfile = _mapper.Map<UserProfileDTO>(user);
            return userProfile;
        }

        // GET api/<UsersController>/CheckEmail/{email}
        [HttpGet]
        [Route("CheckEmail/{email}")]
        public async Task<Object> CheckEmail(string email)
        {
            var result = await _userManager.FindByEmailAsync(email);
            Dictionary<string, bool> responseDict = new Dictionary<string, bool>();
            if (result != null)
            {
                responseDict.Add("isTaken", true);
                return Ok(responseDict);
            }

            responseDict.Add("isTaken", false);
            return Ok(responseDict);
        }

        // GET api/<UsersController>/CheckUserName/{userName}
        [HttpGet]
        [Route("CheckUserName/{userName}")]
        public async Task<Object> CheckUserName(string userName)
        {
            var result = await _userManager.FindByNameAsync(userName);
            Dictionary<string, bool> responseDict = new Dictionary<string, bool>();
            if (result != null)
            {
                responseDict.Add("isTaken", true);
                return Ok(responseDict);
            }

            responseDict.Add("isTaken", false);
            return Ok(responseDict);
        }

        // PUT api/<UsersController>/UserToActive/Guid
        [HttpPut("UserToActive/{userGuid}")]
        public async Task<Object> ChangeStatusOnActive(string userGuid)
        {
            var userAuthorisation =  _userAuthorisationRepository.Get(userGuid);
            if (userAuthorisation != null)
            {
                userAuthorisation.Status = 1;
                var user = await _userManager.FindByIdAsync(userGuid);
                user.Status = 1;
                await _userManager.UpdateAsync(user);
                return  StatusCode(204);
            }
            return StatusCode(404);
        }

        // PUT api/<UsersController>/ChangeUserRole
        [HttpPut("ChangeUserRole")]
        public async Task<Object> ChangeUserRole(UserRoleChanger model)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            var adminRole = await _roleManager.FindByNameAsync(_appSettings.AdminRole);

            if (user.RoleName == adminRole.Id)
            {
                var userToChangeRole = await _userManager.FindByIdAsync(model.UserGuid);
                await _userManager.RemoveFromRoleAsync(userToChangeRole, userToChangeRole.RoleName);
                var newRole = await _roleManager.FindByNameAsync(model.NewUserRole);
                userToChangeRole.Role = newRole;
                userToChangeRole.RoleName = newRole.Name;
                await _userManager.AddToRoleAsync(userToChangeRole, newRole.Name);
                await _userManager.UpdateAsync(userToChangeRole);
                return StatusCode(204);
            }
            return StatusCode(404);
        }

        // POST api/<UsersController>/Registry
        [HttpPost]
        [Route("Registry")]
        public async Task<Object> PostUser(UserDTO model)
        {
            var user = _mapper.Map<User>(model);
            user.Role = _roleManager.Roles.FirstOrDefault(r => r.Name == _appSettings.NormalUserRole);
            try
            {
                var result = await _userManager.CreateAsync(user, model.Password);
                await _userManager.AddToRoleAsync(user, user.Role.Name);
                //var userAuthorisation = await _userAuthorisationRepository.CreateNewObject(user.Id);
                //await _userAuthorisationRepository.AddAsync(userAuthorisation);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }

        // POST api/<UsersController>/UserLogin
        [HttpPost]
        [Route("UserLogin")]
        public async Task<IActionResult> LoginUser(Login model)
        {
            var user = await  _userManager.FindByNameAsync(model.UserName);
            if (user != null &&  await _userManager.CheckPasswordAsync(user, model.Password) )
            {
                try
                {
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[] {
                            new Claim("UserID", user.Id.ToString())
                        }),
                        Expires = DateTime.UtcNow.AddMinutes(17),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                    var token = tokenHandler.WriteToken(securityToken);
                    var userProfile = _mapper.Map<UserProfileDTO>(user);
                    var role = await _roleManager.FindByIdAsync(userProfile.RoleName);
                    userProfile.RoleName = role.Name.ToLower();
                    userProfile.Token = token;
                    var usersLoginHistory =  new UsersLoginHistory {
                        UserId = user.Id,
                        User = user,
                        LoginDate = DateTime.Now
                    };
                    await _usersLoginHistoryRepository.AddAsync(usersLoginHistory);
                    return Ok(userProfile);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            return StatusCode(403);
        }

        // PUT api/<UsersController>/Delete
        [HttpPut("Delete")]
        [Authorize]
        public async Task<Object> UserDeleteOwnAccount()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            user.Status = 2;
            await _userManager.UpdateAsync(user);
            return StatusCode(204);
        }

        //DELETE api/<UsersController>/DeleteByAdmin/{userGuid}
        [HttpDelete("DeleteByAdmin/{userGuid}")]
        [Authorize]
        public async Task<Object> DeleteUser(string userGuid)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            var adminRole = await _roleManager.FindByNameAsync(_appSettings.AdminRole);

            if (user.RoleName == adminRole.Id)
            {
                var userToRemove = await _userManager.FindByIdAsync(userGuid);
                userToRemove.Status = 2;
                await _userManager.UpdateAsync(userToRemove);
                return StatusCode(204);
            }
            return StatusCode(403);
        }
    }
}
