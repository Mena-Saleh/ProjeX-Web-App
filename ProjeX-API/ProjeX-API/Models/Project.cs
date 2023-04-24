using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProjeX_API.Models
{
    public class Project
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}")]

        public DateTime CreationDate { get; set; } = DateTime.UtcNow.Date;

        public ICollection<User>? Users { get; set; }

        public Project()
        {
            Users = new List<User>();
        }
    }
}
