using System;

namespace Domain
{
    public class VaccineConfirmation
    {
         public Guid Id { get; set; }
        public string Email { get; set; }
        public DateTime Date { get; set; }
        public string VaccineName { get; set; }
        public string Location { get; set; }
 
    }
}