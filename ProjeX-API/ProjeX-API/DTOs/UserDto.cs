using ProjeX_API.Models;
using System.ComponentModel.DataAnnotations;

namespace ProjeX_API.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }

        //Empty constructor for deserialization
        public UserDto() { 
        }
        public UserDto(User user)
        {
            Id = user.Id;
            Username = user.Username;
            Email = user.Email;
        }
    }
}
