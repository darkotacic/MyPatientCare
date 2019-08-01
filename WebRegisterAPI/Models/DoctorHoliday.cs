using System.ComponentModel.DataAnnotations.Schema;
using WebRegisterAPI.Models.User;

namespace WebRegisterAPI.Models
{
    public class DoctorHoliday
    {
        [Column(TypeName = "nvarchar(450)")]
        public string DoctorId { get; set; }
        public ApplicationUser Doctor { get; set; }
        public int HolidayId { get; set; }
        public Holiday Holiday { get; set; }
    }
}
