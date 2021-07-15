using System.Collections.Generic;
using Domain;

namespace API.DTOs
{
    public class UserDto
    {
        public string Id { get; set; }
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string Image {get; set; }
        public string Username { get; set; }
        public string Role { get; set; }

        public ICollection<Test> Tests { get; set; }
    }
}