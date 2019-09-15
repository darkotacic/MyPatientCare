using System;
using System.Collections.Generic;
using WebRegisterAPI.Models;
using WebRegisterAPI.ViewModels;

namespace WebRegisterAPI.Repositories.IRepositories
{
    public interface IScheduleRepository
    {
        Schedule GetScheduleForDoctor(string doctorId, DayOfWeek dayOfWeek);

        IEnumerable<Schedule> GetAllSchedulesForDoctor(string doctorId);

        Schedule GetScheduleById(int scheduleId);

        FreeDaysViewModel GetFreeDaysForUser(string doctorId);
        Schedule CreateSchedule(Schedule schedule);
        Schedule UpdateSchedule(Schedule schedule);
    }
}
