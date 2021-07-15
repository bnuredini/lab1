using System;
using System.Collections.Generic;
using Application.Profiles;

namespace Application.Doctors
{
    public class DoctorDto
    {
          public Guid Id { get; set; }
        public string Type { get; set; }
        public ICollection<Profile> Patients { get; set; }
    }
}