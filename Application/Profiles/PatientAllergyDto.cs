using System;

namespace Application.Profiles
{
    public class PatientAllergyDto
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public string Causes { get; set; }
    }
}