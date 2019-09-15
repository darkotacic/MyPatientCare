using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using WebRegisterAPI.Database;
using WebRegisterAPI.Models;
using WebRegisterAPI.Repositories.IRepositories;
using WebRegisterAPI.ViewModels;

namespace WebRegisterAPI.Repositories
{
    public class ScheduleRepository : BaseRepository, IScheduleRepository
    {
        public ScheduleRepository(AppDbContext context) : base(context)
        {
        }

        public Schedule CreateSchedule(Schedule schedule)
        {
            _context.Schedules.Add(schedule);
            _context.SaveChanges();
            return schedule;
        }

        public IEnumerable<Schedule> GetAllSchedulesForDoctor(string doctorId)
        {
            return _context.Schedules.Where(schedule => schedule.DoctorId == doctorId).OrderBy(schedule => schedule.DayOfWeek);
        }

        public FreeDaysViewModel GetFreeDaysForUser(string doctorId)
        {
            List<Schedule> schedules = GetAllSchedulesForDoctor(doctorId).ToList();
            if (schedules.Count > 0)
            {
                FreeDaysViewModel viewModel = new FreeDaysViewModel();
                foreach (Schedule schedule in schedules)
                {
                    viewModel.FreeDays.Remove(Convert.ToInt32(schedule.DayOfWeek));
                }
                return viewModel;
            }
            return null;
        }

        public Schedule GetScheduleById(int scheduleId)
        {
            return _context.Schedules.SingleOrDefault(schedule => schedule.Id == scheduleId);
        }

        public Schedule GetScheduleForDoctor(string doctorId, DayOfWeek day)
        {
            return _context.Schedules.Where(schedule => schedule.DoctorId == doctorId && schedule.DayOfWeek == day).FirstOrDefault();
        }

        public Schedule UpdateSchedule(Schedule scheduleChange)
        {
            var schedule = _context.Schedules.Attach(scheduleChange);
            schedule.State = EntityState.Modified;
            _context.SaveChanges();
            return scheduleChange;
        }
    }
}
