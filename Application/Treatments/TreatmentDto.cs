using System;
using System.Collections.Generic;
using Application.Profiles;

namespace Application.Treatments
{
    public class TreatmentDto
    {
        public Guid Id { get; set; }
        public string Description {get; set;}
        public DateTime Date { get; set; }
        public string Patient { get; set; }
        public string Doctor { get; set; }
        public ICollection<Profile> Patients { get; set; }
    }
}