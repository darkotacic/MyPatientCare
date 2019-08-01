using System.Collections.Generic;
using WebRegisterAPI.Models;
using WebRegisterAPI.Models.User;
using WebRegisterAPI.ViewModels;

namespace WebRegisterAPI.Repositories.IRepositories
{
    public interface ITreatmentRepository
    {
        Treatment GetTreatment(int Id);
        IEnumerable<Treatment> GetAllTreatments();
        Treatment Add(Treatment treatment);
        Treatment Update(Treatment treatmentChanges);
        Treatment Delete(int id);
        IEnumerable<ApplicationUser> GetDoctorsForTreatment(int typeId);
    }
}
