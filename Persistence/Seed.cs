using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Tests.Any()) return;
            
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

            await context.Tests.AddRangeAsync(tests);
            await context.Countries.AddRangeAsync(countries);
            await context.SaveChangesAsync();
        }
    }
}