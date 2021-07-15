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
        public DbSet<Location> Locations { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<CovidRestriction> CovidRestrictions { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Variation> Variations { get; set; }
        public DbSet<Rezult> Rezults { get; set; }
        public DbSet<Drug> Drugs { get; set; }
        public DbSet<Treatment> Treatments { get; set; }
        public DbSet<Chronic_Disease> Chronic_Diseases { get; set; }
        public DbSet<Private_Center> Private_Centers { get; set; }
        public DbSet<Public_Center> Public_Centers { get; set; }
        public DbSet<TestConfirmation> TestConfirmations { get; set; }
        public DbSet<VaccineConfirmation> VaccineConfirmations { get; set; }
        public DbSet<Vaccine> Vaccines { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<Allergy> Allergies { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<VaccineApplication> VaccineApplications { get; set; }
        public DbSet<TestingCenter> TestingCenters { get; set; }
        public DbSet<PatientVaccine> PatientVaccines { get; set; }
        public DbSet<PatientChronicDisease> PatientChronicDisease { get; set; }
        public DbSet<PatientAllergy> PatientAllergy { get; set; }
        public DbSet<PatientResult> PatientResults { get; set; }
        public DbSet<PatientApplication> PatientApplications { get; set; }
        public DbSet<PatientDoctor> PatientDoctors { get; set; }
        public DbSet<PatientDrug> PatientDrugs { get; set; }
        public DbSet<PatientTreatment> PatientTreatments { get; set; }
        public DbSet<UserPosition> UserPostions { get; set; }

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

            // Defie a composite PK for PatientVaccine.
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
                .HasForeignKey(pc => pc.AppUserId);
            builder.Entity<PatientChronicDisease>()
                .HasOne(c => c.ChronicDisease)
                .WithMany(u => u.Patients)
                .HasForeignKey(pc => pc.ChronicDiseaseId);

            builder.Entity<PatientAllergy>(x => x.HasKey(pa => new {pa.AppUserId, pa.AllergyId}));
            builder.Entity<PatientAllergy>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.Allergies)
                .HasForeignKey(pa => pa.AppUserId);
            builder.Entity<PatientAllergy>()
                .HasOne(a => a.Allergy)
                .WithMany(u => u.Patients)
                .HasForeignKey(pa => pa.AllergyId);
                
            builder.Entity<PatientResult>(x => x.HasKey(pr => new {pr.AppUserId, pr.ResultId}));
            builder.Entity<PatientResult>()
                .HasOne(u => u.AppUser)
                .WithMany(r => r.Results)
                .HasForeignKey(pr => pr.AppUserId);
            builder.Entity<PatientResult>()
                .HasOne(v => v.Result)
                .WithMany(u => u.Patients)
                .HasForeignKey(pr => pr.ResultId);
            builder.Entity<PatientApplication>(x => x.HasKey(pa => new {pa.AppUserId, pa.ApplicationId}));
            builder.Entity<PatientApplication>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.Applications)
                .HasForeignKey(pa => pa.AppUserId);
            builder.Entity<PatientApplication>()
                .HasOne(a => a.Application)
                .WithMany(u => u.Patients)
                .HasForeignKey(pa => pa.ApplicationId);

            builder.Entity<PatientDoctor>(x => x.HasKey(pr => new {pr.AppUserId, pr.DoctorId}));
            builder.Entity<PatientDoctor>()
                .HasOne(u => u.AppUser)
                .WithMany(r => r.Doctors)
                .HasForeignKey(pr => pr.AppUserId);
            builder.Entity<PatientDoctor>()
                .HasOne(v => v.Doctor)
                .WithMany(u => u.Patients)
                .HasForeignKey(pr => pr.DoctorId);

            builder.Entity<PatientDrug>(x => x.HasKey(pr => new {pr.AppUserId, pr.DrugId}));
            builder.Entity<PatientDrug>()
                .HasOne(u => u.AppUser)
                .WithMany(r => r.Drugs)
                .HasForeignKey(pr => pr.AppUserId);
            builder.Entity<PatientDrug>()
                .HasOne(v => v.Drug)
                .WithMany(u => u.Patients)
                .HasForeignKey(pr => pr.DrugId);

            builder.Entity<PatientTreatment>(x => x.HasKey(pr => new {pr.AppUserId, pr.TreatmentId}));
            builder.Entity<PatientTreatment>()
                .HasOne(u => u.AppUser)
                .WithMany(r => r.Treatments)
                .HasForeignKey(pr => pr.AppUserId);
            builder.Entity<PatientTreatment>()
                .HasOne(v => v.Treatment)
                .WithMany(u => u.Patients)
                .HasForeignKey(pr => pr.TreatmentId);

            builder.Entity<UserPosition>(x => x.HasKey(ur => new {ur.AppUserId, ur.RoleId}));
            builder.Entity<UserPosition>()
                .HasOne(u => u.AppUser)
                .WithMany(r => r.Positions)
                .HasForeignKey(ur => ur.AppUserId);
            builder.Entity<UserPosition>()
                .HasOne(r => r.Position)
                .WithMany(u => u.Users)
                .HasForeignKey(ur => ur.RoleId);

              
            builder.Entity<Test>()
                .HasOne(t => t.AppUser)
                .WithMany(au => au.Tests);

        }
    }
}