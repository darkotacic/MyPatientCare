using WebRegisterAPI.Models;

namespace WebRegisterAPI.Repositories.IRepositories
{
    public interface IHospitalRepositoy
    {
        Hospital GetHospital(int? hospitalId);
    }
}
