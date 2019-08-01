using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebRegisterAPI.Models;
using WebRegisterAPI.Models.User;

namespace WebRegisterAPI.Database
{
    public class AppDbContext : IdentityDbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Hospital> Hospitals { get; set; }
        public DbSet<DoctorType> DoctorTypes { get; set; }
        public DbSet<Treatment> Treatments { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Holiday> Holidays { get; set; }

        public DbSet<ContactInfo> ContactInfos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<DoctorHoliday>()
                .HasKey(dh => new { dh.HolidayId, dh.DoctorId });

            modelBuilder.Entity<Appointment>()
             .HasOne(appointment => appointment.Patient)
             .WithMany(user => user.UserAppointments)
             .HasForeignKey(appointment => appointment.PatientId)
             .HasConstraintName("ForeignKey_Appointment_Patient");

            modelBuilder.Seed();
        }
    }
}
