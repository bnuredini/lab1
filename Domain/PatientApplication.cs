using System;

namespace Domain
{
    public class PatientApplication
    {
         public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid ApplicationId { get; set; }
        public VaccineApplication Application { get; set; }
    }
}