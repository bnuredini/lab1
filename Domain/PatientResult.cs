using System;

namespace Domain
{
    public class PatientResult
    {
         public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid ResultId { get; set; }
        public Rezult Result { get; set; }
    }
}