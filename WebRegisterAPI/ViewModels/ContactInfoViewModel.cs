using WebRegisterAPI.Models;

namespace WebRegisterAPI.ViewModels
{
    public class ContactInfoViewModel
    {
        public string ContactValue { get; set; }
        public ContactType ContactType { get; set; }
        public string ContactTypeString { get; set; }
    }
}
