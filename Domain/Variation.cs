using System;
using System.Collections.Generic;

namespace Domain
{
    public class Variation
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<Rezult> Results { get; set; }
    }
}