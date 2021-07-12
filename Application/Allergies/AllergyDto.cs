using System;
using System.Collections.Generic;
using Application.Profiles;

namespace Application.Allergies
{
    public class AllergyDto
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public string Causes { get; set; }
        public ICollection<Profile> Patients { get; set; }
    }
}