using System.Collections.Generic;
using WebRegisterAPI.Models;
using WebRegisterAPI.ViewModels;

namespace WebRegisterAPI.Services.IServices
{
    public interface ITreatmentService
    {
        Treatment GetTreatment(int Id);
        IEnumerable<Treatment> GetAllTreatments();
        Treatment Add(Treatment treatment);
        Treatment Update(Treatment treatmentChanges);
        Treatment Delete(int id);

        List<ApplicationUserViewModel> GetDoctorsForTreatment(int treatmentId, string userId);
    }
}
