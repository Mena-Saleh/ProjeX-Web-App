using System.ComponentModel.DataAnnotations;

namespace ProjeX_API.DTOs
{
    public class CategoryCreateDto
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
