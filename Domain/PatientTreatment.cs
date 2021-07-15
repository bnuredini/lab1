using System;

namespace Domain
{
    public class PatientTreatment
    {
         public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid TreatmentId { get; set; }
        public Treatment Treatment { get; set; }
    }
}