using System;

namespace Domain
{
    public class UserPosition
    {
         public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid RoleId { get; set; }
        public Position Position { get; set; }
    }
}