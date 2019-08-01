using System.Collections.Generic;
using WebRegisterAPI.Models;

namespace WebRegisterAPI.ViewModels
{
    public class DoctorViewModel
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string DoctorType { get; set; }
        public string Monogram { get; set; }
        public List<ContactInfoViewModel> ContactInfoItems { get; set; }
    }
}
