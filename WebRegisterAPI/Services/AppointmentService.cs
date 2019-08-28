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
        private readonly IHolidayRepository holidayRepository;
        private readonly IScheduleRepository scheduleRepository;

        public AppointmentService(IAppointmentRepository appointmentRepository,
                                  ITreatmentRepository treatmentRepository,
                                  IHolidayRepository holidayRepository,
                                  IScheduleRepository scheduleRepository)
        {
            this.appointmentRepository = appointmentRepository;
            this.treatmentRepository = treatmentRepository;
            this.holidayRepository = holidayRepository;
            this.scheduleRepository = scheduleRepository;
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

        public List<string> GetAllAvailableDates(string doctorId, DateTime date, int treatmentId)
        {
            bool isOnHoliday = holidayRepository.CheckDateForUserHoliday(doctorId, date);
            if (!isOnHoliday)
            {
                Treatment treatment = treatmentRepository.GetTreatment(treatmentId);
                List<Appointment> appointments = appointmentRepository.GetAppointmentsForDoctor(doctorId, date).ToList();
                Schedule schedule = scheduleRepository.GetScheduleForDoctor(doctorId, date.DayOfWeek);
                if (treatment != null && schedule != null)
                {
                    List<DateTime> freeAppointments = GetFreeAppointments(treatment, appointments, schedule, date);
                    return MapDates(freeAppointments);
                }
                return null;
            }
            return null;
        }

        private List<string> MapDates(List<DateTime> freeAppointments)
        {
            List<string> dates = new List<string>();
            foreach (DateTime appointment in freeAppointments)
            {
                dates.Add(appointment.ToString("HH:mm"));
            }
            return dates;
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


        private List<DateTime> GetFreeAppointments(Treatment treatment, List<Appointment> appointments, Schedule schedule, DateTime date)
        {
            DateTime minDate = new DateTime(date.Year, date.Month, date.Day, schedule.StartTime, 0, 0);
            DateTime maxDate = new DateTime(date.Year, date.Month, date.Day, schedule.EndTime, 0, 0);
            List<DateTime> availableDates = new List<DateTime>();
            const int DATE_PERIOD = 15;
            if (appointments.Count == 0)
            {
                while (minDate <= maxDate)
                {
                    availableDates.Add(minDate);
                    minDate = minDate.AddMinutes(DATE_PERIOD);
                }
                int border = (int)Math.Ceiling(treatment.Duration / (double)DATE_PERIOD);
                return availableDates.GetRange(0, availableDates.Count - border);
            }
            else
            {
                List<List<DateTime>> dateMatix = new List<List<DateTime>>();
                List<DateTime> appointmentDates = new List<DateTime>();
                List<DateTime> myArray = new List<DateTime>();
                foreach (Appointment appointment in appointments)
                {
                    appointmentDates.Add(appointment.Date);
                    appointmentDates.Add(appointment.Date.AddMinutes(appointment.Treatment.Duration));
                }
                if (minDate == appointmentDates[0])
                {
                    minDate = minDate.AddMinutes(DATE_PERIOD);
                }
                while (appointmentDates.Count > 0)
                {
                    if (minDate <= appointmentDates[0])
                    {
                        myArray.Add(minDate);
                    }
                    else
                    {
                        appointmentDates.RemoveAt(0);
                        if (myArray.Count > 0)
                        {
                            List<DateTime> localList = new List<DateTime>();
                            localList.AddRange(myArray);
                            dateMatix.Add(localList);
                            myArray.Clear();
                        }
                        int round = (int)Math.Ceiling(appointmentDates[0].Minute / (double)DATE_PERIOD);
                        minDate = appointmentDates[0].AddMinutes(round * DATE_PERIOD - appointmentDates[0].Minute);
                        appointmentDates.RemoveAt(0);
                        while (appointmentDates.Count > 0 && minDate == appointmentDates[0])
                        {
                            appointmentDates.RemoveAt(0);
                            int roundValue = (int)Math.Ceiling(appointmentDates[0].Minute / (double)DATE_PERIOD);
                            minDate = appointmentDates[0].AddMinutes(roundValue * DATE_PERIOD - appointmentDates[0].Minute);
                            appointmentDates.RemoveAt(0);
                        }
                        myArray.Add(minDate);
                        if (appointmentDates.Count == 0 && minDate != maxDate)
                        {
                            while (minDate < maxDate)
                            {
                                minDate = minDate.AddMinutes(DATE_PERIOD);
                                myArray.Add(minDate);
                            }
                            dateMatix.Add(myArray);
                        }
                    }
                    minDate = minDate.AddMinutes(DATE_PERIOD);
                }

                int rightBorder = (int)Math.Ceiling(treatment.Duration / (double)DATE_PERIOD);
                for (int i = 0; i < dateMatix.Count; i++)
                {
                    if (rightBorder < dateMatix[i].Count)
                    {
                        availableDates.AddRange(dateMatix[i].GetRange(0, dateMatix[i].Count - rightBorder));
                    }
                }
            }
            return availableDates;
        }
    }
}
