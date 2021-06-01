using System;
using System.Collections.Generic;

namespace Domain
{
    public class Chronic_Disease
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<AppUser> Patient { get; set; }
    }
}