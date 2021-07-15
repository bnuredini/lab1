using System;

namespace Application.Profiles
{
    public class PatientTreatmentDto
    {
        public Guid Id { get; set; }
        public string Description {get; set;}
        public DateTime Date { get; set; }
        public string Patient { get; set; }
        public string Doctor { get; set; }
    }
}