using System;
using System.Collections.Generic;
using Application.Profiles;

namespace Application.Drugs
{
    public class DrugDto
    {
        public Guid Id { get; set; }
        public string Name {get; set;}
        public string Type { get; set; }
        public string SideEffects { get; set; }
        public string Description { get; set; }
        public ICollection<Profile> Patients { get; set; }
    }
}