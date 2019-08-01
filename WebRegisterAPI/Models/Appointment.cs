using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebRegisterAPI.Models.User
{
    public class Appointment
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }
        [Required]
        public Status AppointmentStatus { get; set; }
        public ApplicationUser Doctor { get; set; }
        [ForeignKey("Doctor")]
        [Column(TypeName = "nvarchar(450)")]
        public string DoctorId { get; set; }
        public ApplicationUser Patient { get; set; }
        [ForeignKey("Patient")]
        [Column(TypeName = "nvarchar(450)")]
        public string PatientId { get; set; }
        public Treatment Treatment { get; set; }
        [ForeignKey("Treatment")]
        public int TreatmentId { get; set; }
    }
}
