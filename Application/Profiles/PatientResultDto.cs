using System;

namespace Application.Profiles
{
    public class PatientResultDto
    {
        public Guid Id { get; set; }
        public string Result { get; set; }
        public string TestName { get; set; }
        public DateTime Date { get; set; }
    }
}