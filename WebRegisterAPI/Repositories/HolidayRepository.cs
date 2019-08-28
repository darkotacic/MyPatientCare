﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebRegisterAPI.Database;
using WebRegisterAPI.Models;
using WebRegisterAPI.Repositories.IRepositories;

namespace WebRegisterAPI.Repositories
{
    public class HolidayRepository : BaseRepository, IHolidayRepository
    {
        public HolidayRepository(AppDbContext context) : base(context)
        {
        }
        public bool CheckDateForUserHoliday(string doctorId, DateTime date)
        {
            IEnumerable<Holiday> holidays = _context.Holidays.Where(holiday => holiday.DoctorHolidays.Any(dc => dc.DoctorId == doctorId) && Between(date, holiday.StartDate, holiday.EndDate));
            return holidays.ToList().Count > 0 ? true : false;
        }

        private bool Between(DateTime input, DateTime date1, DateTime date2)
        {
            return (input > date1 && input < date2);
        }
    }
}
