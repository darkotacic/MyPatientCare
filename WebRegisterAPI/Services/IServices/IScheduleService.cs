using WebRegisterAPI.ViewModels;

namespace WebRegisterAPI.Services.IServices
{
    public interface IScheduleService
    {
        SchedulesViewModel GetAllSchedulesForDoctor(string doctorId);
    }
}
