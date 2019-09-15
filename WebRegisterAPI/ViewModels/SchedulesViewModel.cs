using System;
using System.Collections.Generic;
using WebRegisterAPI.Models;

namespace WebRegisterAPI.ViewModels
{
    public class SchedulesViewModel
    {
        public List<ScheduleViewModel> Schedules { get; set; }

        public FreeDaysViewModel FreeDays { get; set; }

        public SchedulesViewModel()
        {
            Schedules = new List<ScheduleViewModel>();
            FreeDays = new FreeDaysViewModel();
        }
    }
}
