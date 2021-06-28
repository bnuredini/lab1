using System;
using System.Collections.Generic;

namespace Domain
{
    public class TestingCenter
    {
        public Guid  Private_CenterId { get; set; }
        public Private_Center Private_Center { get; set; }
        public Guid Public_CenterId { get; set; }
        public Public_Center Public_Center { get; set; }
        public ICollection<Test> Tests { get; set; }
    }
}