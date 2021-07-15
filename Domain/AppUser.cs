using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName {get; set;}
        public string Bio {get; set;}
        public string Role { get; set; }
        public ICollection<Test> Tests { get; set; }
        public ICollection<PatientChronicDisease> ChronicDisease { get; set; }
        public ICollection<Article> Articles { get; set; }
        public ICollection<PatientVaccine> Vaccines { get; set; }
        public ICollection<PatientResult> Results { get; set; }
        public ICollection<PatientAllergy> Allergies { get; set; }
        public ICollection<PatientApplication> Applications { get; set; }
        public ICollection<PatientDoctor> Doctors { get; set; }
        public ICollection<PatientDrug> Drugs { get; set; }
        public ICollection<PatientTreatment> Treatments { get; set; }
    }
}