using System;
using System.Collections.Generic;

namespace Domain
{
    public class Test
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public String Result { get; set; }
        public AppUser AppUser { get; set; }
    }
}