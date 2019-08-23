using System;
using System.Collections.Generic;
using WebRegisterAPI.Models.User;
using WebRegisterAPI.ViewModels;

namespace WebRegisterAPI.Services.IServices
{
    public interface IAppointmentService
    {
        IEnumerable<Appointment> GetAllAppointments();
        Appointment CreateAppointment(CreateAppointmentViewModel viewModel);
        List<AppointmentViewModel> GetAllUserAppointments(string userId);

        List<long> GetAllUserAppointmentsForDate(string userId, DateTime date);

    }
}
