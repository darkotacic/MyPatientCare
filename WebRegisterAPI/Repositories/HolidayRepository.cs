using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using WebRegisterAPI.Database;
using WebRegisterAPI.Models;
using WebRegisterAPI.Models.User;
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
            IEnumerable<Holiday> holidays = _context.Holidays.Where(holiday => holiday.DoctorHolidays.Any(dh => dh.DoctorId == doctorId) && Between(date, holiday.StartDate, holiday.EndDate));
            return holidays.ToList().Count > 0 ? true : false;
        }

        public Holiday CreateHoliday(Holiday holiday, string userId)
        {
            ApplicationUser doctor = _context.ApplicationUsers.Include(user => user.DoctorHolidays)
                                                              .Single(user => user.Id == userId);
            doctor.DoctorHolidays.Add(new DoctorHoliday
            {
                Doctor = doctor,
                Holiday = holiday
            });
            _context.SaveChanges();
            return holiday;
        }

        public Holiday GetHolidayById(int holidayId)
        {
            return _context.Holidays.Where(holiday => holiday.DoctorHolidays.Any(dh => dh.HolidayId == holidayId)).FirstOrDefault();
        }

        public IEnumerable<Holiday> GetHolidays(string doctorId)
        {
            return _context.Holidays.Where(holiday => holiday.DoctorHolidays.Any(dh => dh.DoctorId == doctorId));
        }

        public Holiday UpdateHoliday(Holiday holidayChange)
        {
            var holiday = _context.Holidays.Attach(holidayChange);
            holiday.State = EntityState.Modified;
            _context.SaveChanges();
            return holidayChange;
        }

        private bool Between(DateTime input, DateTime date1, DateTime date2)
        {
            return (input > date1 && input < date2);
        }
    }
}
