using System;
using System.Collections.Generic;

namespace Domain
{
    public class Rezult
    {
        public Guid Id { get; set; }
        public string Result { get; set; }
        public string TestName { get; set; }
        public DateTime Date { get; set; }
        public ICollection<Variation> Variations { get; set; }
        public ICollection<PatientResult> Patients { get; set; } = new List<PatientResult>();
    }
}