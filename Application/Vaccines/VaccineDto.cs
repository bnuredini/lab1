using System;
using System.Collections.Generic;
using Application.Profiles;

namespace Application.Vaccines
{
    public class VaccineDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Efficacy { get; set; }
        public string Creator { get; set; }
        public string Type { get; set; }
        public ICollection<Profile> Patients { get; set; }
    }
}