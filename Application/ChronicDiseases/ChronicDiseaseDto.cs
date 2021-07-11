using System;
using System.Collections.Generic;
using Application.Profiles;

namespace Application.ChronicDiseases
{
    public class ChronicDiseaseDto
    {
         public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<Profile> Patients { get; set; }
    }
}