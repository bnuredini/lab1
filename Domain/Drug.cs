using System;
using System.Collections.Generic;

namespace Domain
{
    public class Drug
    {
        public Guid Id { get; set; }
        public string Name {get; set;}
        public string Type { get; set; }
        public string SideEffects { get; set; }
        public string Description { get; set; }
        public ICollection<PatientDrug> Patients { get; set; }= new List<PatientDrug>();
    }
}