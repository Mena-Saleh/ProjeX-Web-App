using System.ComponentModel.DataAnnotations;

namespace ProjeX_API.Models
{
    public class Category
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        public ICollection<Task> Tasks { get; set; }



        public Category() { 
            Tasks = new List<Task>();
        }
    }
}
