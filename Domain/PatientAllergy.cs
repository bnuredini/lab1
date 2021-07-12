using System;

namespace Domain
{
    public class PatientAllergy
    {
         public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid AllergyId { get; set; }
        public Allergy Allergy { get; set; }
    }
}