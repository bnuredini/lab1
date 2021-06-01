using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName="Test", UserName="test", Email="test@test.com"},
                    new AppUser{DisplayName="Test2", UserName="test2", Email="test2@test.com"},
                    new AppUser{DisplayName="Test3", UserName="test3", Email="test3@test.com"},
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    
                }
            }


            if (context.Patients.Any()) return;
            
            var tests = new List<Test>
            {
                new Test
                {
                    PatientId = 2,
                    Date = DateTime.Now.AddMonths(-2),
                    Description = "Test 2 months ago",
                    HospitalId = 1,
                    VaccineId = 2,
                    Variation = "B.1.1.7"
                },
                new Test
                {
                    PatientId = 2,
                    Date = DateTime.Now.AddMonths(-2),
                    Description = "Test 2 months ago",
                    HospitalId = 1,
                    VaccineId = 3,
                    Variation = "B.1.351"
                },
                new Test
                {
                    PatientId = 2,
                    Date = DateTime.Now.AddMonths(-2),
                    Description = "Test 2 months ago",
                    HospitalId = 1,
                    VaccineId = 3,
                    Variation = "P.1"
                },
            };

            var countries = new List<Country> 
            {
                new Country {
                    Id = 1,
                    Name = "Australia",
                    Deaths = 9000000,
                    Infections = 322414123,
                    Vaccinated = 2414123,
                    Recoveries = 3418890,
                },
                new Country {
                    Id = 2,
                    Name = "Albania",
                    Deaths = 2800,
                    Infections = 303123,
                    Vaccinated = 314123,
                    Recoveries = 48890,
                }
            };

            var patients = new List<Patient>
            {
                new Patient
                {
                    Full_Name="Qendresa Berisha",
                    Birthday = DateTime.Now.AddMonths(-2),
                    Gender = "Female",
                    Phone_Number = 049343431,
                    Email = "email@gmail.com",
                    Address = "Prishtine"
                },
                new Patient
                {
                    Full_Name="Filan Fisteku",
                    Birthday = DateTime.Now.AddMonths(-2),
                    Gender = "Female",
                    Phone_Number = 049455431,
                    Email = "email@gmail.com",
                    Address = "Prishtine"
                },
                new Patient
                {
                    Full_Name="Shembull3",
                    Birthday =DateTime.Now.AddMonths(-2) ,
                    Gender = "Male",
                    Phone_Number = 049123456,
                    Email = "email@gmail.com",
                    Address = "Prishtine"
                },
            };

           

            await context.Tests.AddRangeAsync(tests);
            await context.Countries.AddRangeAsync(countries);
            await context.Patients.AddRangeAsync(patients);
            
            await context.SaveChangesAsync();
        }
    }
}