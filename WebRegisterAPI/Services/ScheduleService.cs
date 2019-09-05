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
        public SchedulesViewModel GetAllSchedulesForDoctor(string doctorId)
        {
            List<Schedule> schedules = scheduleRepository.GetAllSchedulesForDoctor(doctorId).ToList();
            return Map(schedules);
        }

        private SchedulesViewModel Map(List<Schedule> schedules)
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
            if (schedules.Count > 0)
            {
                foreach (Schedule schedule in schedules)
                {
                    viewModel.FreeDays.Remove(Convert.ToInt32(schedule.DayOfWeek));
                }
            }
            return viewModel;
        }
    }
}
