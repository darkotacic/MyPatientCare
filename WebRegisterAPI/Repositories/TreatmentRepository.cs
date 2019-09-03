using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using WebRegisterAPI.Database;
using WebRegisterAPI.Models;
using WebRegisterAPI.Models.User;
using WebRegisterAPI.Repositories.IRepositories;
using WebRegisterAPI.ViewModels;

namespace WebRegisterAPI.Repositories
{
    public class TreatmentRepository : BaseRepository, ITreatmentRepository
    {

        public TreatmentRepository(AppDbContext context) : base(context)
        {
        }

        public Treatment Add(Treatment treatment)
        {
            _context.Treatments.Add(treatment);
            _context.SaveChanges();
            return treatment;
        }

        public Treatment Delete(int id)
        {
            Treatment treatment = _context.Treatments.Find(id);
            if (treatment != null)
            {
                _context.Treatments.Remove(treatment);
                _context.SaveChanges();
            }
            return treatment;
        }

        public IEnumerable<Treatment> GetAllTreatments()
        {
            return _context.Treatments;
        }

        public Treatment GetTreatment(int Id)
        {
            return _context.Treatments.Find(Id);
        }

        public Treatment Update(Treatment treatmentChanges)
        {
            var treatment = _context.Treatments.Attach(treatmentChanges);
            treatment.State = EntityState.Modified;
            _context.SaveChanges();
            return treatmentChanges;
        }

        public IEnumerable<ApplicationUser> GetDoctorsForTreatment(int typeId, int? hospitalId)
        {
            return _context.ApplicationUsers.Where(user => user != null && user.TypeId == typeId && user.HospitalId == hospitalId)
                                            .Include(user => user.Type);
        }
    }
}
