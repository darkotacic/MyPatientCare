using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebRegisterAPI.Models
{
    public class Holiday
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [JsonIgnore]
        public List<DoctorHoliday> DoctorHolidays { get; set; }
    }
}
