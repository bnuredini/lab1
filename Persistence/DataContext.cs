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
        public DbSet<TestingCenter> TestingCenters { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<TestingCenter>(x => x.HasKey(tc => new {tc.Public_CenterId, tc.Private_CenterId}));

            builder.Entity<TestingCenter>()
            .HasOne(p => p.Private_Center)
            .WithMany(s => s.Public_Center)
            .HasForeignKey(tc => tc.Private_CenterId);

            builder.Entity<TestingCenter>()
            .HasOne(p => p.Public_Center)
            .WithMany(s => s.Private_Center)
            .HasForeignKey(tc => tc.Public_CenterId);
        }





    }
}