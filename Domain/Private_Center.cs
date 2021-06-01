using System;
using System.Collections.Generic;

namespace Domain
{
    public class Private_Center
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public ICollection<TestingCenter> Public_Center { get; set; }
        
    }
}