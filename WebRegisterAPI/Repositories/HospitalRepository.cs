using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebRegisterAPI.Database;
using WebRegisterAPI.Models;
using WebRegisterAPI.Repositories.IRepositories;

namespace WebRegisterAPI.Repositories
{
    public class HospitalRepository : BaseRepository, IHospitalRepositoy
    {
        public HospitalRepository(AppDbContext context) : base(context)
        {
        }

        public Hospital GetHospital(int id)
        {
            return _context.Hospitals.Find(id);
        }
    }
}
