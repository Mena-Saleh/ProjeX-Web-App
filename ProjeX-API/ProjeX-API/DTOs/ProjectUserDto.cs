using ProjeX_API.Models;
using System.ComponentModel.DataAnnotations;

namespace ProjeX_API.DTOs
{
    public class ProjectUserDto
    {
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }

        public ProjectUserDto() { }
        public ProjectUserDto(User user) {
            this.Id = user.Id;
            this.Username = user.Username;
            
        }
    }
}
