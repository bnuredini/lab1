using System;

namespace Domain
{
    public class PatientDoctor
    {
         public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid DoctorId { get; set; }
        public Doctor Doctor { get; set; }
    }
}