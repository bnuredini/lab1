using System;
using System.Collections.Generic;

namespace Domain
{
    public class Public_Center
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public ICollection<TestingCenter> Private_Center { get; set; } = new List<TestingCenter>();
    }
}