using WebRegisterAPI.Models;
using WebRegisterAPI.Repositories.IRepositories;
using WebRegisterAPI.Services.IServices;

namespace WebRegisterAPI.Services
{
    public class HospitalService : IHospitalService
    {
        private readonly IHospitalRepositoy hospitalRepository;

        public HospitalService(IHospitalRepositoy hospitalRepository)
        {
            this.hospitalRepository = hospitalRepository;
        }
        public Hospital GetHospital(int? hospitalId)
        {
            return hospitalRepository.GetHospital(hospitalId);
        }
    }
}
