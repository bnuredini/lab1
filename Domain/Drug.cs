using System;

namespace Domain
{
    public class Drug
    {
        public Guid Id { get; set; }
        public string Name {get; set;}
        public string Type { get; set; }
        public string SideEffects { get; set; }
        public string Description { get; set; }
    }
}