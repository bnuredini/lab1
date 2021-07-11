using System;
using System.Collections.Generic;

namespace Domain
{
    public class Allergy
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public string Causes { get; set; }
    }
}