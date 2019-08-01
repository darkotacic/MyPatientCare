using System.Collections.Generic;
using WebRegisterAPI.Models.User;
using WebRegisterAPI.ViewModels;

namespace WebRegisterAPI.Repositories.IRepositories
{
    public interface IAppointmentRepository
    {
        Appointment GetAppointment(int Id);
        IEnumerable<Appointment> GetAllAppointments();
        Appointment Add(Appointment appointment);
        Appointment Update(Appointment appointmentChange);
        Appointment Delete(int id);

        IEnumerable<Appointment> GetAppointmentsForUser(string userId);
    }
}
