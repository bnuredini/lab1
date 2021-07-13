using System;

namespace Domain
{
    public class Location
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int ZipCode { get; set; }
        public int Infections { get; set; }
        public int Vaccinated { get; set; }
        public int Tested { get; set; }
    }
}