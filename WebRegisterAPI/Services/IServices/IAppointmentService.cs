﻿using System;
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

        List<string> GetAllAvailableDates(string doctorId, DateTime date, int treatmentId);

        AppointmentViewModel GetAppointment(int appointmentId);

        AppointmentViewModel GetAppointmentDetails(string doctorId, int treatmentId, DateTime date);

        Appointment DenyAppointment(int appointmentId);
        Appointment ConfirmAppointment(int appointmentId);

    }
}
