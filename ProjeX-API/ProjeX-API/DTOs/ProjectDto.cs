using ProjeX_API.Models;
using System.ComponentModel.DataAnnotations;

namespace ProjeX_API.DTOs
{
    public class ProjectDto
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }


        public ProjectDto(Project project)
        {
            Id = project.Id;
            Name = project.Name;
            Description = project.Description;
            CreationDate = project.CreationDate;
        }
    }
}
