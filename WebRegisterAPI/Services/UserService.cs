using System;
using System.Collections.Generic;
using System.Linq;
using WebRegisterAPI.Models;
using WebRegisterAPI.Models.User;
using WebRegisterAPI.Repositories.IRepositories;
using WebRegisterAPI.Services.IServices;
using WebRegisterAPI.ViewModels;

namespace WebRegisterAPI.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        private readonly IContactInfoRepository contactInfoRepository;

        public UserService(IUserRepository userRepository, IContactInfoRepository contactInfoRepository)
        {
            this.userRepository = userRepository;
            this.contactInfoRepository = contactInfoRepository;
        }

        public DoctorViewModel GetDoctorById(string userId)
        {
            ApplicationUser user = userRepository.GetUserById(userId);
            if (user != null)
            {
                List<ContactInfo> contactInfos = contactInfoRepository.GetContactInfosForUser(userId).ToList();
                DoctorViewModel viewModel = new DoctorViewModel()
                {
                    Id = user.Id,
                    DoctorType = user.Type.Name,
                    FullName = user.FullName,
                    Monogram = GetMonogram(user.FullName),
                    ContactInfoItems = Map(contactInfos)
                };
                return viewModel;
            }
            return null;
        }

        public List<DoctorViewModel> GetAllDoctors()
        {
            List<ApplicationUser> doctors = userRepository.GetAllDoctors().ToList();
            return Map(doctors);
        }
        private List<DoctorViewModel> Map(List<ApplicationUser> doctors)
        {
            List<DoctorViewModel> viewModel = new List<DoctorViewModel>();
            doctors.ForEach(doctor =>
            {
                viewModel.Add(
                    new DoctorViewModel()
                    {
                        Id = doctor.Id,
                        FullName = doctor.FullName,
                        DoctorType = doctor.Type.Name,
                        Monogram = GetMonogram(doctor.FullName)
                    }
                );
            });
            return viewModel;
        }

        private List<ContactInfoViewModel> Map(List<ContactInfo> contactInfos)
        {
            List<ContactInfoViewModel> viewModel = new List<ContactInfoViewModel>();
            contactInfos.ForEach(contactInfo =>
            {
                viewModel.Add(
                    new ContactInfoViewModel()
                    {
                        ContactType = contactInfo.ContactType,
                        ContactValue = contactInfo.ContactValue,
                        ContactTypeString = contactInfo.ContactType.ToString()
                    }
                );
            });
            return viewModel;
        }
        private string GetMonogram(string fullName)
        {
            string[] nameArray = fullName.Split(' ');
            string monogram = "";
            if (nameArray.Length > 0)
            {
                monogram = nameArray[0].Substring(0, 1).ToUpper();
                if (nameArray.Length > 1)
                {
                    monogram += nameArray[1].Substring(0, 1).ToUpper();
                }
            }
            return monogram;
        }
    }
}
