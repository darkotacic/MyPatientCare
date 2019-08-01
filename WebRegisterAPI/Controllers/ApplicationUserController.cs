﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebRegisterAPI.Models;
using WebRegisterAPI.Models.User;
using WebRegisterAPI.Services.IServices;
using WebRegisterAPI.ViewModels;

namespace WebRegisterAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _singInManager;
        private readonly ITreatmentService treatmentService;
        private readonly IUserService userService;
        private readonly ApplicationSettings _appSettings;

        public ApplicationUserController(UserManager<ApplicationUser> userManager,
                                        SignInManager<ApplicationUser> signInManager,
                                        IOptions<ApplicationSettings> appSettings,
                                        ITreatmentService treatmentService,
                                        IUserService userService)
        {
            _singInManager = signInManager;
            this.treatmentService = treatmentService;
            this.userService = userService;
            _userManager = userManager;
            _appSettings = appSettings.Value;
        }

        [HttpPost]
        [Route("Register")]
        //POST : api/ApplicationUser/Register
        public async Task<Object> PostApplicationUser(ApplicationUserViewModel model)
        {

            var applicationUser = new ApplicationUser()
            {
                UserName = model.UserName,
                Email = model.Email,
                FullName = model.FullName
            };
            try
            {
                var result = await _userManager.CreateAsync(applicationUser, model.Password);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("Login")]
        //POST : api/ApplicationUser/Login
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                //Sign in user
                //await _singInManager.PasswordSignInAsync(model.UserName, model.Password, false, false);
                //Get a role
                var role = await _userManager.GetRolesAsync(user);
                IdentityOptions _options = new IdentityOptions();
                var claimList = new List<Claim>
                {
                    new Claim("UserID", user.Id.ToString())
                };

                if (role.Count > 0)
                {
                    claimList.Add(new Claim(_options.ClaimsIdentity.RoleClaimType, role.First()));
                }

                var tokenDescriptor = new SecurityTokenDescriptor()
                {
                    Subject = new ClaimsIdentity(claimList),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature),
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
            {
                return BadRequest(new { message = "Username or password is incorrect." });
            }
        }

        [HttpPost]
        [Authorize]
        [Route("Logout")]
        public async Task<IActionResult> Logout()
        {
            // to get current user ID
            await _singInManager.SignOutAsync();
            return Ok();
        }

        [HttpGet]
        [Route("TreatmentDoctors/{treatmentId}")]
        public IActionResult GetTreatmentDoctors(int treatmentId)
        {
            List<ApplicationUserViewModel> doctors = treatmentService.GetDoctorsForTreatment(treatmentId);
            if (doctors != null && doctors.Count > 0)
            {
                return Ok(doctors);
            }
            return NotFound(new { message = "No doctors for selected treatment" });
        }

        [HttpGet]
        [Authorize]
        [Route("Doctors")]
        public IActionResult GetAllDoctors()
        {
            List<DoctorViewModel> doctors = userService.GetAllDoctors();
            if (doctors != null && doctors.Count > 0)
            {
                return Ok(doctors);
            }
            return NotFound(new { message = "No doctors" });
        }

        [HttpGet]
        [Authorize]
        [Route("User/{userId}")]
        public IActionResult GetUserById(string userId)
        {
            DoctorViewModel doctor = userService.GetDoctorById(userId);
            if (doctor != null)
            {
                return Ok(doctor);
            }
            return NotFound(new { message = "No user with that id" });
        }
    }
}