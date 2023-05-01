using System.ComponentModel.DataAnnotations;

namespace ProjeX_API.Models
{
    public class Task
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public int AssignedToId { get; set; }
        public string AssignedToName { get; set; }
        public DateTime CreationDate { get; set; } = DateTime.UtcNow.Date;
        public DateTime DueDate { get; set; }
        public bool isFinished { get; set; }


    }
}
