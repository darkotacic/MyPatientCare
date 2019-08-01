using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebRegisterAPI.ViewModels
{
    public class AppointmentViewModel
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string StringDate { get; set; }
        public string DoctorId { get; set; }
        public string DoctorName { get; set; }
        public string AppointmentStatus { get; set; }
        public string TreatmentName { get; set; }
        public int TreatmentId { get; set; }
    }
}
