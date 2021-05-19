using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Test> Tests { get; set; }
        public DbSet<Country> Countries { get; set; }
         public DbSet<Patient> Patients{get; set;}
    }
}