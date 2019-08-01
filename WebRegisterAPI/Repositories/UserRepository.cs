using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using WebRegisterAPI.Database;
using WebRegisterAPI.Models.User;
using WebRegisterAPI.Repositories.IRepositories;

namespace WebRegisterAPI.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(AppDbContext context) : base(context)
        {
        }
        public IEnumerable<ApplicationUser> GetAllDoctors()
        {
            return _context.ApplicationUsers.Where(user => user.TypeId != null).Include(user => user.Type);
        }

        public ApplicationUser GetUserById(string userId)
        {
            ApplicationUser user = _context.ApplicationUsers.Find(userId);
            user.Type = _context.DoctorTypes.Find(user.TypeId);
            return user;
        }
    }
}
