using System;

namespace Domain
{
    public class PatientChronicDisease
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid ChronicDiseaseId { get; set; }
        public Chronic_Disease ChronicDisease { get; set; }
    }
}