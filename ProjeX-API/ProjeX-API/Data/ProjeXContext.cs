using Microsoft.EntityFrameworkCore;
using ProjeX_API.Models;
using Task = ProjeX_API.Models.Task;

namespace ProjeX_API.Data
{
    public class ProjeXContext : DbContext
    {
        public ProjeXContext(DbContextOptions<ProjeXContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserFriend> UserFriends { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Task> Tasks { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Make a unique constraint for email
            modelBuilder.Entity<User>()
                .HasIndex(m => m.Email)
                .IsUnique();

            modelBuilder.Entity<UserFriend>()
                .HasKey(uf => uf.Id);

            modelBuilder.Entity<UserFriend>()
                .HasOne<User>(uf => uf.User)
                .WithMany(u => u.Friends)
                .HasForeignKey(uf => uf.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserFriend>()
                .HasOne<User>(uf => uf.Friend)
                .WithMany()
                .HasForeignKey(uf => uf.FriendId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_UserFriend_Friend_User_Id");




        }
    }
}
