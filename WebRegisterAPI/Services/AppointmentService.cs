using System;
using System.Collections.Generic;
using System.Linq;
using WebRegisterAPI.Models;
using WebRegisterAPI.Models.User;
using WebRegisterAPI.Repositories.IRepositories;
using WebRegisterAPI.Services.IServices;
using WebRegisterAPI.ViewModels;

namespace WebRegisterAPI.Services
{
    public class AppointmentService : IAppointmentService
    {
        private readonly IAppointmentRepository appointmentRepository;
        private readonly ITreatmentRepository treatmentRepository;

        public AppointmentService(IAppointmentRepository appointmentRepository,
                                  ITreatmentRepository treatmentRepository)
        {
            this.appointmentRepository = appointmentRepository;
            this.treatmentRepository = treatmentRepository;
        }

        public Appointment CreateAppointment(CreateAppointmentViewModel viewModel)
        {
            Treatment treatment = treatmentRepository.GetTreatment(viewModel.TreatmentId);
            if (treatment != null)
            {
                Appointment appointment = new Appointment()
                {
                    PatientId = viewModel.PatientId,
                    DoctorId = viewModel.DoctorId,
                    TreatmentId = viewModel.TreatmentId,
                    AppointmentStatus = Status.PENDING,
                    Date = viewModel.Date,
                    Treatment = treatment
                };
                appointmentRepository.Add(appointment);
                return appointment;
            }
            return null;
        }

        public IEnumerable<Appointment> GetAllAppointments()
        {
            return appointmentRepository.GetAllAppointments();
        }

        public List<AppointmentViewModel> GetAllUserAppointments(string userId)
        {
            List<Appointment> appointments = appointmentRepository.GetAppointmentsForUser(userId).ToList();
            return Map(appointments);
        }

        public List<long> GetAllUserAppointmentsForDate(string userId, DateTime date)
        {
            List<Appointment> appointments = appointmentRepository.GetAppointmentsForDate(userId, date).ToList();
            return MillisecondMap(appointments);
        }

        private List<AppointmentViewModel> Map(List<Appointment> appointments)
        {
            List<AppointmentViewModel> viewModel = new List<AppointmentViewModel>();
            appointments.ForEach(appointment =>
            {
                viewModel.Add(
                    new AppointmentViewModel()
                    {
                        Id = appointment.Id,
                        DoctorId = appointment.DoctorId,
                        AppointmentStatus = appointment.AppointmentStatus.ToString(),
                        Date = appointment.Date,
                        StringDate = appointment.Date.ToString("MM/dd/yyyy"),
                        DoctorName = appointment.Doctor.FullName,
                        TreatmentId = appointment.TreatmentId,
                        TreatmentName = appointment.Treatment.Name
                    }
               );
            });
            return viewModel;
        }

        private List<long> MillisecondMap(List<Appointment> appointments)
        {
            List<long> list = new List<long>();
            appointments.ForEach(appointment =>
            {
                list.Add(
                    new DateTimeOffset(appointment.Date).ToUnixTimeMilliseconds()
               );
            });
            return list;
        }
    }
}
