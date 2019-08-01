using Microsoft.EntityFrameworkCore;
using WebRegisterAPI.Models;

namespace WebRegisterAPI.Database
{
    public static class ModelBuilderExtensions
    {

        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Hospital>().HasData(
                new Hospital
                {
                    Id = 1,
                    Name = "Klinicki centar Vojvodina",
                    Address = "Bulevar Vojvode Stepe 44",
                    PhoneNumber = "0245554441",
                    DirectorName = "Josip Broz Tito",
                    Latitude = 45.2671,
                    Longitude = 19.8335
                },
               new Hospital
               {
                   Id = 2,
                   Name = "Drzavna bolnica Subotica",
                   Address = "Beogradski put 120",
                   PhoneNumber = "0245554442",
                   DirectorName = "Zvonko Bogdan",
                   Latitude = 46.081349,
                   Longitude = 19.672744
               }
            );

            modelBuilder.Entity<DoctorType>().HasData(
                new DoctorType
                {
                    Id = 1,
                    Name = "Surgeon",

                },
               new DoctorType
               {
                   Id = 2,
                   Name = "Internist",
               },
               new DoctorType
               {
                   Id = 3,
                   Name = "Neurologist"
               }
            );

            modelBuilder.Entity<Treatment>().HasData(
                new Treatment
                {
                    Id = 1,
                    Name = "Massage",
                    Duration = 30,
                    TypeId = 2,

                },
               new Treatment
               {
                   Id = 2,
                   Name = "MRI",
                   Duration = 120,
                   TypeId = 3,
               },
               new Treatment
               {
                   Id = 3,
                   Name = "First check up",
                   Duration = 20,
                   TypeId = 1,
               }
            );
        }
    }
}
