using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using WebRegisterAPI.Models.User;

namespace WebRegisterAPI.Models
{
    public class DoctorType
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [JsonIgnore]
        public List<ApplicationUser> Doctors { get; set; }
        [JsonIgnore]
        public List<Treatment> Treatments { get; set; }
    }
}
