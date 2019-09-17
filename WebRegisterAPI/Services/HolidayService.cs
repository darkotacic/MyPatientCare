using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public List<HolidayViewModel> GetHolidays(string doctorId)
        {
            List<Holiday> holidays = holidayRepistory.GetHolidays(doctorId).ToList();
            return Map(holidays);
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
                        StartDateString = holiday.StartDate.ToString("MM/dd/yyyy"),
                        EndDateString = holiday.EndDate.ToString("MM/dd/yyyy")
                    }
               );
            });
            return viewModel;
        }
    }
}
