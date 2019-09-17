using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebRegisterAPI.ViewModels
{
    public class HolidayViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public string StartDateString { get; set; }

        public string EndDateString { get; set; }
    }
}
