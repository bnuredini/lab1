using System;
using System.Collections.Generic;
using Application.Profiles;

namespace Application.Rezults
{
    public class ResultDto
    {
        public Guid Id { get; set; }
        public string Result { get; set; }
        public string TestName { get; set; }
        public DateTime Date { get; set; }
        public ICollection<Profile> Patients { get; set; }
    }
}