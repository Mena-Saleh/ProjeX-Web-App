using Microsoft.EntityFrameworkCore;
using ProjeX_API.Models;

namespace ProjeX_API.Data
{
    public class ProjeXContext : DbContext
    {
        public ProjeXContext(DbContextOptions<ProjeXContext> options): base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}
