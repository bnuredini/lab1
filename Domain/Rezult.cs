using System;
using System.Collections.Generic;

namespace Domain
{
    public class Rezult
    {
        public Guid Id { get; set; }
        public string Result { get; set; }
        public ICollection<Test> Tests { get; set; }
        public ICollection<Variation> Variations { get; set; }
    }
}