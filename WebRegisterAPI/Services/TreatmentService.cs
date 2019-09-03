using System.Collections.Generic;
using System.Linq;
using WebRegisterAPI.Models;
using WebRegisterAPI.Models.User;
using WebRegisterAPI.Repositories.IRepositories;
using WebRegisterAPI.Services.IServices;
using WebRegisterAPI.ViewModels;

namespace WebRegisterAPI.Services
{
    public class TreatmentService : ITreatmentService
    {
        private readonly ITreatmentRepository treatmentRepository;
        private readonly IUserRepository userRepository;

        public TreatmentService(ITreatmentRepository treatmentRepository, IUserRepository userRepository)
        {
            this.treatmentRepository = treatmentRepository;
            this.userRepository = userRepository;
        }
        public Treatment Add(Treatment treatment)
        {
            return treatmentRepository.Add(treatment);
        }

        public Treatment Delete(int id)
        {
            return treatmentRepository.Delete(id);
        }

        public IEnumerable<Treatment> GetAllTreatments()
        {
            return treatmentRepository.GetAllTreatments();
        }

        public List<ApplicationUserViewModel> GetDoctorsForTreatment(int treatmentId, string userId)
        {
            Treatment treatment = treatmentRepository.GetTreatment(treatmentId);
            ApplicationUser user = userRepository.GetUserById(userId);
            List<ApplicationUserViewModel> viewModel = new List<ApplicationUserViewModel>();
            if (treatment != null)
            {
                List<ApplicationUser> model = treatmentRepository.GetDoctorsForTreatment(treatment.TypeId, user.HospitalId).ToList();
                viewModel = Map(model);
            }
            return viewModel;
        }

        public Treatment GetTreatment(int Id)
        {
            return treatmentRepository.GetTreatment(Id);
        }

        public Treatment Update(Treatment treatmentChanges)
        {
            return treatmentRepository.Update(treatmentChanges);
        }

        private List<ApplicationUserViewModel> Map(List<ApplicationUser> doctors)
        {
            List<ApplicationUserViewModel> viewModel = new List<ApplicationUserViewModel>();
            doctors.ForEach(doctor =>
            {
                viewModel.Add(
                    new ApplicationUserViewModel()
                    {
                        Id = doctor.Id,
                        Email = doctor.Email,
                        UserName = doctor.UserName,
                        FullName = doctor.FullName,
                        DoctorType = doctor.Type.Name

                    }
               );
            });
            return viewModel;
        }
    }
}
