using System;

namespace Domain
{
    public class TestConfirmation
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public DateTime Date { get; set; }
        public string TestName { get; set; }
        public string Location { get; set; }
    }
}