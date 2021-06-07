using System;
using System.Collections.Generic;

namespace Domain
{
    public class Test
    {
        public Guid Id { get; set; }
        
        public DateTime Date { get; set; }
        public int PatientId { get; set; }
        public string Description { get; set; }
        public int HospitalId { get; set; }
        public int VaccineId { get; set; }
        public string Variation { get; set; }
        public ICollection<AppUser> Patient { get; set; }
        public ICollection<Rezult> Results { get; set; }
        public ICollection<TestingCenter> Centers { get; set; }
        public ICollection<Vaccine> Vaccines { get; set; }
    }
}