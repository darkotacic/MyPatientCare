using System.Collections.Generic;
using WebRegisterAPI.ViewModels;

namespace WebRegisterAPI.Services.IServices
{
    public interface IUserService
    {
        List<DoctorViewModel> GetAllDoctors(int? hospitalId);

        DoctorViewModel GetDoctorById(string userId);
    }
}
