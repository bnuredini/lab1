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
        public DbSet<Drug> Drugs { get; set; }
        public DbSet<Treatment> Treatments { get; set; }
        public DbSet<Chronic_Disease> Chronic_Diseases { get; set; }
        public DbSet<Private_Center> Private_Centers { get; set; }
        public DbSet<Public_Center> Public_Centers { get; set; }
        public DbSet<Vaccine> Vaccines { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<Allergy> Allergies { get; set; }
        public DbSet<Position> Positions { get; set; }


        public DbSet<VaccineApplication> VaccineApplications { get; set; }
        public DbSet<TestingCenter> TestingCenters { get; set; }
        public DbSet<PatientVaccine> PatientVaccines { get; set; }
        public DbSet<PatientChronicDisease> PatientChronicDisease { get; set; }
        public DbSet<UserPosition> UserPositions { get; set; }


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

            builder.Entity<PatientVaccine>(x => x.HasKey(pv => new {pv.AppUserId, pv.VaccineId}));
            builder.Entity<PatientVaccine>()
                .HasOne(u => u.AppUser)
                .WithMany(v => v.Vaccines)
                .HasForeignKey(pv => pv.AppUserId);
            builder.Entity<PatientVaccine>()
                .HasOne(v => v.Vaccine)
                .WithMany(u => u.Patients)
                .HasForeignKey(pv => pv.VaccineId);

            builder.Entity<PatientChronicDisease>(x => x.HasKey(pc => new {pc.AppUserId, pc.ChronicDiseaseId}));
            builder.Entity<PatientChronicDisease>()
                .HasOne(u => u.AppUser)
                .WithMany(c => c.ChronicDisease)
                .HasForeignKey(pv => pv.AppUserId);
            builder.Entity<PatientChronicDisease>()
                .HasOne(c => c.ChronicDisease)
                .WithMany(u => u.Patients)
                .HasForeignKey(pc => pc.ChronicDiseaseId);

            builder.Entity<UserPosition>(x => x.HasKey(ur => new {ur.AppUserId, ur.RoleId}));
            builder.Entity<UserPosition>()
                .HasOne(u => u.AppUser)
                .WithMany(r => r.Positions)
                .HasForeignKey(ur => ur.AppUserId);
            builder.Entity<UserPosition>()
                .HasOne(r => r.Position)
                .WithMany(u => u.Users)
                .HasForeignKey(ur => ur.RoleId);

              
        }
    }
}