using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName {get; set;}
        public string Bio {get; set;}
        public string Role { get; set; }
        public ICollection<Test> Tests { get; set; }
        public ICollection<Chronic_Disease> ChronicDisease { get; set; }
        public ICollection<Article> Articles { get; set; }
        
    
    }
}