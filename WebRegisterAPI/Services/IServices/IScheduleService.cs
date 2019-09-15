using WebRegisterAPI.Models;
using WebRegisterAPI.ViewModels;

namespace WebRegisterAPI.Services.IServices
{
    public interface IScheduleService
    {
        SchedulesViewModel GetAllSchedulesForDoctor(string doctorId);

        SchedulesViewModel GetScheduleById(int scheduleId);

        FreeDaysViewModel GetFreeDays(string doctorId);
        Schedule CreateSchedule(Schedule schedule);
        Schedule UpdateSchedule(Schedule schedule);
    }
}
