using System;
using System.Collections.Generic;

namespace Domain
{
    public class Vaccine
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Efficacy { get; set; }
        public string Creator { get; set; }
        public string Type { get; set; }
        public ICollection<Test> Tests { get; set; }

        public ICollection<PatientVaccine> Patients { get; set; } = new List<PatientVaccine>();
    }
}