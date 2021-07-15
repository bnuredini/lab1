using System;
using System.Collections.Generic;

namespace Domain
{
    public class VaccineApplication
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public DateTime Date { get; set; }
        public string Email { get; set; }
        public string Location { get; set; }
        public ICollection<PatientApplication> Patients { get; set; } = new List<PatientApplication>();
    }
}