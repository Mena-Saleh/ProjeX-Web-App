using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjeX_API.Dtos;
using ProjeX_API.DTOs;
using ProjeX_API.Models;
using ProjeX_API.Services;

namespace ProjeX_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ProjeXContext _context;

        public UserController(ProjeXContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDto userDto)
        {
            if (_context.Users.Any(u => u.Email == userDto.Email))
            {
                return BadRequest("Email already exists");
            }

            var user = new User()
            {
                Username = userDto.Username,
                Email = userDto.Email,
            };

            user.SetPassword(userDto.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Generate a JWT token for the user
            var token = JwtService.GenerateToken(user.Id);

            // Return the token in the response
            return Ok(new { token });
        }

        [HttpPost("login")]
        public IActionResult Login(UserLoginDto userDto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == userDto.Email);
            if (user == null)
            {
                return BadRequest(new { message = "email or password is incorrect" });
            }

            if (!user.CheckPassword(userDto.Password))
            {
                return BadRequest(new { message = "email or password is incorrect" });
            }

            // Generate a JWT token for the user
            var token = JwtService.GenerateToken(user.Id);

            // Return the token in the response
            return Ok(new { token });
        }

        [HttpGet("{id}")]
        public ActionResult<UserDto> GetUser(int id)
        {
            var user = _context.Users.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(new UserDto(user));
        }

        [HttpGet]
        public ActionResult<IEnumerable<UserDto>> GetUsers()
        {
            var users = _context.Users.ToList();
            var userDtos = users.Select(u => new UserDto(u)).ToList();
            return Ok(userDtos);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserDto userDto)
        {
            if (id != userDto.Id)
            {
                return BadRequest();
            }

            var existingUser = _context.Users.Find(id);

            if (existingUser == null)
            {
                return NotFound();
            }

            existingUser.Username = userDto.Username;
            existingUser.Email = userDto.Email;
            existingUser.SetPassword(userDto.Password);

            _context.Users.Update(existingUser);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = _context.Users.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("{id}/friends")]
        public ActionResult<IEnumerable<User>> GetFriends(int id)
        {
            var friends = _context.UserFriends
                .Include(uf => uf.Friend)
                .Where(uf => uf.UserId == id)
                .Select(uf => uf.Friend)
                .ToList();

            return friends;
        }

        [HttpPost("{id}/friends/{friendId}")]
        public IActionResult AddFriend(int id, int friendId)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            var friend = _context.Users.FirstOrDefault(u => u.Id == friendId);
            if (user == null || friend == null)
            {
                return NotFound();
            }

            var userFriend = new UserFriend { UserId = id, FriendId = friendId };
            var userFriendMutual = new UserFriend { UserId = friendId, FriendId = id };

            _context.UserFriends.Add(userFriend);
            _context.UserFriends.Add(userFriendMutual);
            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}/friends/{friendId}")]
        public IActionResult RemoveFriend(int id, int friendId)
        {
            var userFriend = _context.UserFriends.FirstOrDefault(uf => uf.UserId == id && uf.FriendId == friendId);
            var userFriendMutual = _context.UserFriends.FirstOrDefault(uf => uf.UserId == friendId && uf.FriendId == id);

            if (userFriend == null || userFriendMutual == null)
            {
                return NotFound();
            }

            _context.UserFriends.Remove(userFriend);
            _context.UserFriends.Remove(userFriendMutual);
            _context.SaveChanges();

            return Ok();
        }

        [HttpGet("{userId}/friends/{friendId}/status")]
        public ActionResult<bool> CheckFriendshipStatus(int userId, int friendId)
        {
            bool isFriend = _context.UserFriends.Any(uf => uf.UserId == userId && uf.FriendId == friendId);
            return Ok(isFriend);
        }


    }
}
