

using System.Collections.Generic;
using WebRegisterAPI.Models;

namespace WebRegisterAPI.Repositories.IRepositories
{
    public interface IContactInfoRepository
    {
        IEnumerable<ContactInfo> GetContactInfosForUser(string userId);
    }
}
