using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebRegisterAPI.Models;

namespace WebRegisterAPI.Repositories.IRepositories
{
    public interface IHolidayRepository
    {
        bool CheckDateForUserHoliday(string doctorId, DateTime date);

        IEnumerable<Holiday> GetHolidays(string doctorId);
    }
}
