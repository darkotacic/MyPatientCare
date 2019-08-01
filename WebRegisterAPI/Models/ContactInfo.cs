using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebRegisterAPI.Models.User;

namespace WebRegisterAPI.Models
{
    public class ContactInfo
    {
        [Key]
        public int Id { get; set; }
        public ContactType ContactType { get; set; }
        [JsonIgnore]
        public ApplicationUser ContactUser { get; set; }
        [ForeignKey("ContactUser")]
        public string ContactUserId { get; set; }
        public string ContactValue { get; set; }
    }
}
