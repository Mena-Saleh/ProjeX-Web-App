namespace ProjeX_API.Models
{
    public class UserFriend
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int FriendId { get; set; }
        public User Friend { get; set; }
    }
}
