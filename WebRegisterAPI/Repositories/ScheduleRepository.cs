using System;
using System.Linq;
using WebRegisterAPI.Database;
using WebRegisterAPI.Models;
using WebRegisterAPI.Repositories.IRepositories;

namespace WebRegisterAPI.Repositories
{
    public class ScheduleRepository : BaseRepository, IScheduleRepository
    {
        public ScheduleRepository(AppDbContext context) : base(context)
        {
        }

        public Schedule GetScheduleForDoctor(string doctorId, DayOfWeek day)
        {
            return _context.Schedules.Where(schedule => schedule.DoctorId == doctorId && schedule.DayOfWeek == day).FirstOrDefault();
        }
    }
}
