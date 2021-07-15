using System;

namespace Application.Profiles
{
    public class PatientApplicationDto
    {
    
      public Guid Id { get; set; }
        public string Type { get; set; }
        public DateTime Date { get; set; }
        public string Email { get; set; }
        public string Location { get; set; }

    

    }
}
   