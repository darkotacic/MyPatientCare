using System.Collections.Generic;
using System.Linq;
using WebRegisterAPI.Models;
using WebRegisterAPI.Repositories.IRepositories;
using WebRegisterAPI.Services.IServices;

namespace WebRegisterAPI.Services
{
    public class ContactInfoService : IContactInfoService
    {
        private readonly IContactInfoRepository contactInfoRepository;

        public ContactInfoService(IContactInfoRepository contactInfoRepository)
        {
            this.contactInfoRepository = contactInfoRepository;
        }
        public List<ContactInfo> GetContactInfosForUser(string userId)
        {
            return contactInfoRepository.GetContactInfosForUser(userId).ToList();
        }
    }
}
