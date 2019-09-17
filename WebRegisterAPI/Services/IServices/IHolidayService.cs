using System.Collections.Generic;
using WebRegisterAPI.ViewModels;

namespace WebRegisterAPI.Services.IServices
{
    public interface IHolidayService
    {
        List<HolidayViewModel> GetHolidays(string doctorId);
    }
}
