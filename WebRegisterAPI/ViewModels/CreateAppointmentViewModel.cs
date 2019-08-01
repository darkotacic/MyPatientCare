using System;
using System.ComponentModel.DataAnnotations;

namespace WebRegisterAPI.ViewModels
{
    public class CreateAppointmentViewModel
    {
        [Required]
        public string DoctorId { get; set; }
        [Required]
        public string PatientId { get; set; }
        [Required]
        public int TreatmentId { get; set; }
        [Required]
        public DateTime Date { get; set; }
    }
}
