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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Make a unique constraint for email
            modelBuilder.Entity<User>()
                .HasIndex(m => m.Email)
                .IsUnique();
        }
    }
}
