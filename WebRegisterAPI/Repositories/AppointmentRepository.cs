using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using WebRegisterAPI.Database;
using WebRegisterAPI.Models;
using WebRegisterAPI.Models.User;
using WebRegisterAPI.Repositories.IRepositories;
using WebRegisterAPI.ViewModels;

namespace WebRegisterAPI.Repositories
{
    public class AppointmentRepository : BaseRepository, IAppointmentRepository
    {

        public AppointmentRepository(AppDbContext context) : base(context)
        {
        }

        public Appointment Add(Appointment appointment)
        {
            _context.Appointments.Add(appointment);
            _context.SaveChanges();
            return appointment;
        }

        public Appointment Delete(int id)
        {
            Appointment appointment = _context.Appointments.Find(id);
            if (appointment != null)
            {
                _context.Appointments.Remove(appointment);
                _context.SaveChanges();
            }
            return appointment;
        }

        public IEnumerable<Appointment> GetAllAppointments()
        {
            return _context.Appointments.Include(a => a.Treatment)
                                        .Include(a => a.Doctor);
        }

        public Appointment GetAppointment(int Id)
        {
            return _context.Appointments.Find(Id);
        }

        public IEnumerable<Appointment> GetAppointmentsForDate(string userId, DateTime date)
        {
            ApplicationUser user = _context.ApplicationUsers.Find(userId);
            if (user != null)
            {
                IEnumerable<Appointment> userAppointments = GetAllAppointments().Where(appointment => appointment != null && appointment.PatientId == userId && appointment.Date.Date == date.Date);
                return userAppointments;
            }
            return null;
        }

        public IEnumerable<Appointment> GetAppointmentsForDoctor(string doctorId, DateTime date)
        {
            ApplicationUser doctor = _context.ApplicationUsers.Find(doctorId);
            if (doctor != null)
            {
                IEnumerable<Appointment> userAppointments = GetAllAppointments().Where(appointment => appointment != null &&
                                                                                       appointment.DoctorId == doctorId &&
                                                                                       appointment.Date.Date == date.Date &&
                                                                                       appointment.AppointmentStatus == Status.APPROVED)
                                                                                .OrderBy(app => app.Date);
                return userAppointments;
            }
            return null;
        }

        public IEnumerable<Appointment> GetAppointmentsForUser(string userId)
        {
            ApplicationUser user = _context.ApplicationUsers.Find(userId);
            if (user != null)
            {
                IEnumerable<Appointment> userAppointments = GetAllAppointments().Where(appointment => appointment != null && appointment.PatientId == userId);
                return userAppointments;
            }
            return null;
        }

        public Appointment Update(Appointment appointmentChange)
        {
            var appointment = _context.Appointments.Attach(appointmentChange);
            appointment.State = EntityState.Modified;
            _context.SaveChanges();
            return appointmentChange;
        }
    }
}
