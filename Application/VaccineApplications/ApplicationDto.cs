using System;
using System.Collections.Generic;
using Application.Profiles;

namespace Application.VaccineApplications
{
    public class ApplicationDto
    {
         
        public Guid Id { get; set; }
        public string Type { get; set; }
        public DateTime Date { get; set; }
        public string Email { get; set; }
        public string Location { get; set; }
        public ICollection<Profile> Patients { get; set; }
    }
}