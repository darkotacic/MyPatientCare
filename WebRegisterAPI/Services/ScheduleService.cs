using System;
using System.Collections.Generic;
using System.Linq;
using WebRegisterAPI.Models;
using WebRegisterAPI.Repositories.IRepositories;
using WebRegisterAPI.Services.IServices;
using WebRegisterAPI.ViewModels;

namespace WebRegisterAPI.Services
{
    public class ScheduleService : IScheduleService
    {
        private readonly IScheduleRepository scheduleRepository;

        public ScheduleService(IScheduleRepository scheduleRepository)
        {
            this.scheduleRepository = scheduleRepository;
        }

        public Schedule CreateSchedule(Schedule schedule)
        {
            return scheduleRepository.CreateSchedule(schedule);
        }

        public SchedulesViewModel GetAllSchedulesForDoctor(string doctorId)
        {
            List<Schedule> schedules = scheduleRepository.GetAllSchedulesForDoctor(doctorId).ToList();
            return Map(schedules, doctorId);
        }

        public FreeDaysViewModel GetFreeDays(string doctorId)
        {
            return scheduleRepository.GetFreeDaysForUser(doctorId);
        }

        public SchedulesViewModel GetScheduleById(int scheduleId)
        {
            Schedule schedule = scheduleRepository.GetScheduleById(scheduleId);
            SchedulesViewModel viewModel = new SchedulesViewModel();
            if (schedule != null)
            {
                viewModel.Schedules.Add(new ScheduleViewModel()
                {
                    Id = schedule.Id,
                    DoctorId = schedule.DoctorId,
                    DayOfWeek = schedule.DayOfWeek,
                    StartTime = schedule.StartTime,
                    EndTime = schedule.EndTime,
                    DayOfWeekName = schedule.DayOfWeek.ToString()
                });
                viewModel.FreeDays = scheduleRepository.GetFreeDaysForUser(schedule.DoctorId);
                return viewModel;
            }
            return null;
        }

        public Schedule UpdateSchedule(Schedule schedule)
        {
            return scheduleRepository.UpdateSchedule(schedule);
        }

        private SchedulesViewModel Map(List<Schedule> schedules, string doctorId)
        {
            SchedulesViewModel viewModel = new SchedulesViewModel();
            schedules.ForEach(schedule =>
            {
                viewModel.Schedules.Add(
                    new ScheduleViewModel()
                    {
                        Id = schedule.Id,
                        DoctorId = schedule.DoctorId,
                        DayOfWeek = schedule.DayOfWeek,
                        StartTime = schedule.StartTime,
                        EndTime = schedule.EndTime,
                        DayOfWeekName = schedule.DayOfWeek.ToString()
                    }
               );
            });
            viewModel.FreeDays = scheduleRepository.GetFreeDaysForUser(doctorId);
            return viewModel;
        }
    }
}
