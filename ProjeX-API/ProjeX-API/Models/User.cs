using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;
using System.Text;

namespace ProjeX_API.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public byte[] PasswordHash { get; set; }
        [Required]
        public byte[] PasswordSalt { get; set; }

        public ICollection<UserFriend> Friends { get; set; }

        public ICollection<Project> Projects { get; set; }
        public User()
        {
            Friends = new List<UserFriend>();
            Projects = new List<Project>();
        }
        public void SetPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                // Generate a random salt for each user
                PasswordSalt = new byte[16];
                using (var rng = RandomNumberGenerator.Create())
                {
                    rng.GetBytes(PasswordSalt);
                }

                // Hash the password with the salt
                PasswordHash = sha256.ComputeHash(Encoding.UTF8.GetBytes(password + Convert.ToBase64String(PasswordSalt)));
            }
        }

        public bool CheckPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                // Hash the password with the stored salt and compare to the stored hash
                var hash = sha256.ComputeHash(Encoding.UTF8.GetBytes(password + Convert.ToBase64String(PasswordSalt)));
                return hash.SequenceEqual(PasswordHash);
            }
        }
    }
}
