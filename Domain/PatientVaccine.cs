using System;

namespace Domain
{
    public class PatientVaccine
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid VaccineId { get; set; }
        public Vaccine Vaccine { get; set; }
    }
}