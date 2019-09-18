using System.Collections.Generic;
using WebRegisterAPI.Models;
using WebRegisterAPI.ViewModels;

namespace WebRegisterAPI.Services.IServices
{
    public interface IHolidayService
    {
        List<HolidayViewModel> GetHolidays(string doctorId);
        Holiday CreateHoliday(Holiday holiday, string userId);
        Holiday GetHolidayById(int holidayId);
        Holiday UpdateHoliday(Holiday holiday);
    }
}
