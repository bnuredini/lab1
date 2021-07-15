using System;

namespace Domain
{
    public class PatientDrug
    {
         public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid DrugId { get; set; }
        public Drug Drug { get; set; }
        
    }
}