using System;
using System.Collections.Generic;

namespace Domain
{
    public class Doctor
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public ICollection<PatientDoctor> Patients { get; set; } = new List<PatientDoctor>();
    }
}