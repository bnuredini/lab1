using System;

namespace Domain
{
    public class CovidRestriction
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public DateTime From { get; set; }
        public DateTime Until { get; set; }
    }
}