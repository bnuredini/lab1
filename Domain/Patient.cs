using System;

namespace Domain
{
    public class Patient
    {
        public Guid Id { get; set; }
        public string Full_Name {get; set;}
        public DateTime Birthday {get; set;}
        public string Gender { get; set; }
        public int Phone_Number { get; set; }
        public string Email { get; set; }

        public string Address { get; set; }        
    }
}