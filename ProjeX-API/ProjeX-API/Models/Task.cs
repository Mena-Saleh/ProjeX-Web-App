using System.ComponentModel.DataAnnotations;

namespace ProjeX_API.Models
{
    public class Task
    {
        public int Id { get; set; }
        [Required]
        //public Category Category { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }
        [Required]

        public int AssignedToId { get; set; }
        [Required]

        public string AssignedToName { get; set; }
        [Required]

        public DateTime CreationDate { get; set; } = DateTime.UtcNow.Date;
        [Required]

        public DateTime DueDate { get; set; }
        [Required]

        public bool isFinished { get; set; }


    }
}
