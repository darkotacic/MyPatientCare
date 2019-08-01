using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebRegisterAPI.Models.User;

namespace WebRegisterAPI.Models
{
    public class Treatment
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int Duration { get; set; }
        [JsonIgnore]
        public List<Appointment> Appointments { get; set; }
        public DoctorType Type { get; set; }
        [ForeignKey("Type")]
        public int TypeId { get; set; }
    }
}
