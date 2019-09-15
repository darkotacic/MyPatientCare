using System;
using System.Collections.Generic;

namespace WebRegisterAPI.ViewModels
{
    public class FreeDaysViewModel
    {
        public Dictionary<int, string> FreeDays { get; set; }

        public FreeDaysViewModel()
        {
            InitDictionary();
        }

        private void InitDictionary()
        {
            FreeDays = new Dictionary<int, string>();
            foreach (DayOfWeek day in Enum.GetValues(typeof(DayOfWeek)))
            {
                string name = Enum.GetName(typeof(DayOfWeek), day);
                FreeDays.Add(Convert.ToInt32(day), name);
            }
        }
    }
}
