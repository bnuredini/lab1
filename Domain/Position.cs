using System;
using System.Collections.Generic;

namespace Domain
{
    public class Position
    {
        public Guid Id { get; set; }
        public string RoleName { get; set; }
        public string Responsibility { get; set; }
        public ICollection<UserPosition> Users { get; set; } = new List<UserPosition>();

    }
}