using System;
using System.Collections.Generic;
using Application.Profiles;

namespace Application.Roles
{
    public class RoleDto
    {
         public Guid Id { get; set; }
        public string RoleName { get; set; }
        public string Responsibility { get; set; }
        public ICollection<Profile> Users { get; set; }
    }
}