using System;
using WebRegisterAPI.Models;

namespace WebRegisterAPI.Repositories.IRepositories
{
    public interface IScheduleRepository
    {
        Schedule GetScheduleForDoctor(string doctorId, DayOfWeek dayOfWeek);
    }
}
