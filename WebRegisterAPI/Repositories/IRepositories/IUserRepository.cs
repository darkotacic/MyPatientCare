using System.Collections.Generic;
using WebRegisterAPI.Models.User;

namespace WebRegisterAPI.Repositories.IRepositories
{
    public interface IUserRepository
    {
        IEnumerable<ApplicationUser> GetAllDoctors();

        ApplicationUser GetUserById(string userId);
    }
}
