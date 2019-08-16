using WebRegisterAPI.Models;

namespace WebRegisterAPI.Services.IServices
{
    public interface IHospitalService
    {
        Hospital GetHospital(int? hospitalId);
    }
}
