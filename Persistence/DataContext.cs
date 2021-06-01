using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Test> Tests { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Variation> Variations { get; set; }
        public DbSet<Rezult> Rezults { get; set; }
        public DbSet<Chronic_Disease> Chronic_Diseases { get; set; }
        public DbSet<Private_Center> Private_Centers { get; set; }
        public DbSet<Public_Center> Public_Centers { get; set; }





    }
}