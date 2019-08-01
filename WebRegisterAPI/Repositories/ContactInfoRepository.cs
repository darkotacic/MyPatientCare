using System.Collections.Generic;
using System.Linq;
using WebRegisterAPI.Database;
using WebRegisterAPI.Models;
using WebRegisterAPI.Repositories.IRepositories;

namespace WebRegisterAPI.Repositories
{
    public class ContactInfoRepository : BaseRepository, IContactInfoRepository
    {
        public ContactInfoRepository(AppDbContext context) : base(context)
        {
        }

        public IEnumerable<ContactInfo> GetContactInfosForUser(string userId)
        {
            return _context.ContactInfos.Where(contact => contact.ContactUserId == userId);
        }
    }
}
