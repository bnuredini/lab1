using System;

namespace Domain
{
    public class Treatment
    {
        public Guid Id { get; set; }
        public string Description {get; set;}
        public DateTime Date { get; set; }
        public string Patient { get; set; }
        public string Doctor { get; set; }
    }
}