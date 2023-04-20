using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<ActionResult<UserDto>> Register(UserDto userDto)
        {
            if (_context.Users.Any(u => u.Email == userDto.Email))
            {
                return BadRequest("Email already exists");
            }

            var user = new User
            {
                Username = userDto.Username,
                Email = userDto.Email
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
                return BadRequest(new { message = "Username or password is incorrect" });
            }

            if (!user.CheckPassword(userDto.Password))
            {
                return BadRequest(new { message = "Username or password is incorrect" });
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
    }
}
