using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebRegisterAPI.Models.User;

namespace WebRegisterAPI.ViewModels
{
    public class ScheduleViewModel
    {

        public int Id { get; set; }

        public DayOfWeek DayOfWeek { get; set; }
        public string DayOfWeekName { get; set; }
        public int StartTime { get; set; }
        public int EndTime { get; set; }

        public string DoctorId { get; set; }
    }
}
