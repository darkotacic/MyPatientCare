using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebRegisterAPI.Models.User;

namespace WebRegisterAPI.Models
{
    public class Schedule
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public DayOfWeek DayOfWeek { get; set; }
        public int StartTime { get; set; }
        public int EndTime { get; set; }
        public ApplicationUser Doctor { get; set; }
        [Column(TypeName = "nvarchar(450)")]
        public string DoctorId { get; set; }
    }
}
