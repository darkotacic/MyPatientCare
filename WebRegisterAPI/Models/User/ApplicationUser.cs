using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebRegisterAPI.Models.User
{
    public class ApplicationUser : IdentityUser
    {
        [Column(TypeName = "nvarchar(150)")]
        public string FullName { get; set; }
        [Column(TypeName = "nvarchar(10)")]
        public string License { get; set; }
        public Hospital Hospital { get; set; }
        [ForeignKey("Hospital")]
        public int HospitalId { get; set; }
        public DoctorType Type { get; set; }
        [ForeignKey("Type")]
        public int? TypeId { get; set; }
        [JsonIgnore]
        public List<Schedule> Schedules { get; set; }
        [JsonIgnore]
        public List<DoctorHoliday> DoctorHolidays { get; set; }
        [JsonIgnore]
        public List<Appointment> UserAppointments { get; set; }
        [JsonIgnore]
        public List<Appointment> DoctorAppointments { get; set; }
        [JsonIgnore]
        public List<ContactInfo> ContactInfos { get; set; }

    }
}
