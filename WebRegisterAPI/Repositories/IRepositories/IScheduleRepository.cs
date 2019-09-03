using System;
using System.Collections.Generic;
using WebRegisterAPI.Models;

namespace WebRegisterAPI.Repositories.IRepositories
{
    public interface IScheduleRepository
    {
        Schedule GetScheduleForDoctor(string doctorId, DayOfWeek dayOfWeek);

        IEnumerable<Schedule> GetAllSchedulesForDoctor(string doctorId);
    }
}
