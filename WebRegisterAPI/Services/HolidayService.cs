using System.Collections.Generic;
using System.Linq;
using WebRegisterAPI.Models;
using WebRegisterAPI.Repositories.IRepositories;
using WebRegisterAPI.Services.IServices;
using WebRegisterAPI.ViewModels;

namespace WebRegisterAPI.Services
{
    public class HolidayService : IHolidayService
    {
        private readonly IHolidayRepository holidayRepistory;

        public HolidayService(IHolidayRepository holidayRepistory)
        {
            this.holidayRepistory = holidayRepistory;
        }

        public Holiday CreateHoliday(Holiday holiday, string userId)
        {
            return holidayRepistory.CreateHoliday(holiday, userId);
        }

        public Holiday GetHolidayById(int holidayId)
        {
            return holidayRepistory.GetHolidayById(holidayId);
        }

        public List<HolidayViewModel> GetHolidays(string doctorId)
        {
            List<Holiday> holidays = holidayRepistory.GetHolidays(doctorId).ToList();
            return Map(holidays);
        }

        public Holiday UpdateHoliday(Holiday holiday)
        {
            return holidayRepistory.UpdateHoliday(holiday);
        }

        private List<HolidayViewModel> Map(List<Holiday> holidays)
        {
            List<HolidayViewModel> viewModel = new List<HolidayViewModel>();
            holidays.ForEach(holiday =>
            {
                viewModel.Add(
                    new HolidayViewModel()
                    {
                        Id = holiday.Id,
                        StartDate = holiday.StartDate,
                        EndDate = holiday.EndDate,
                        Name = holiday.Name,
                        StartDateString = holiday.StartDate.ToString("dd/MM/yyyy"),
                        EndDateString = holiday.EndDate.ToString("dd/MM/yyyy")
                    }
               );
            });
            return viewModel;
        }
    }
}
