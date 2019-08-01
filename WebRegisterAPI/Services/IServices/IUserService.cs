using System.Collections.Generic;
using WebRegisterAPI.ViewModels;

namespace WebRegisterAPI.Services.IServices
{
    public interface IUserService
    {
        List<DoctorViewModel> GetAllDoctors();

        DoctorViewModel GetDoctorById(string userId);
    }
}
