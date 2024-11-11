using System.ComponentModel.DataAnnotations;

namespace ProjeX_API.DTOs
{
    public class UserLoginDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
