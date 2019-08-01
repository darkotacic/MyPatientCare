using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebRegisterAPI.Models;

namespace WebRegisterAPI.Services.IServices
{
    interface IContactInfoService
    {
        List<ContactInfo> GetContactInfosForUser(string userId);
    }
}
