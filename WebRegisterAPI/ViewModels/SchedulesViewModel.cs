using System;
using System.Collections.Generic;
using WebRegisterAPI.Models;

namespace WebRegisterAPI.ViewModels
{
    public class SchedulesViewModel
    {
        public List<ScheduleViewModel> Schedules { get; set; }

        public Dictionary<int, string> FreeDays { get; set; }

        public SchedulesViewModel()
        {
            Schedules = new List<ScheduleViewModel>();
            FreeDays = new Dictionary<int, string>();
            InitDictionary();
        }

        private void InitDictionary()
        {
            foreach (DayOfWeek day in Enum.GetValues(typeof(DayOfWeek)))
            {
                if (!day.Equals(DayOfWeek.Saturday) && !day.Equals(DayOfWeek.Sunday))
                {
                    string name = Enum.GetName(typeof(DayOfWeek), day);
                    FreeDays.Add(Convert.ToInt32(day), name);
                }
            }
        }
    }
}
