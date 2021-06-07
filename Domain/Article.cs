using System;
using System.Collections.Generic;

namespace Domain
{
    public class Article
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Content { get; set; }
        public ICollection<AppUser> User { get; set; }
    }
}