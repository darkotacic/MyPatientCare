using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using WebRegisterAPI.Models.User;
using WebRegisterAPI.Services.IServices;
using WebRegisterAPI.ViewModels;

namespace WebRegisterAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IAppointmentService appointmentService;

        public AppointmentController(UserManager<ApplicationUser> userManager, IAppointmentService appointmentService)
        {
            this.userManager = userManager;
            this.appointmentService = appointmentService;
        }

        [HttpGet]
        [Route("Appointments")]
        public IActionResult GetAppointments()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst("UserID")?.Value;
            if (userId != null)
            {
                List<AppointmentViewModel> appointments = appointmentService.GetAllUserAppointments(userId);
                return Ok(appointments);
            }
            return NotFound(new { message = "No logged in user" });
        }

        [HttpGet]
        [Route("{appointmentId}")]
        public IActionResult GetAppointment(int appointmentId)
        {
            AppointmentViewModel appointment = appointmentService.GetAppointment(appointmentId);
            if (appointment != null)
            {
                return Ok(appointment);
            }
            return NotFound(new { message = "No appointment with that id" });
        }

        [HttpGet]
        [Route("AppointmentDetails")]
        public IActionResult GetAppointmentDetails(string doctorId, int treatmentId, DateTime date)
        {
            AppointmentViewModel appointment = appointmentService.GetAppointmentDetails(doctorId, treatmentId, date);
            if (appointment != null)
            {
                return Ok(appointment);
            }
            return NotFound(new { message = "No appointment with that id" });
        }

        [HttpGet]
        [Route("AppointmentsToday")]
        public IActionResult GetAppointmentsForDate()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst("UserID")?.Value;
            if (userId != null)
            {
                List<long> appointments = appointmentService.GetAllUserAppointmentsForDate(userId, DateTime.Today);
                return Ok(appointments);
            }
            return NotFound(new { message = "No logged in user" });
        }

        [HttpGet]
        [Route("AppointmentsCalendar")]
        public IActionResult GetAppointmentsForCalendar(string doctorId, int treatmentId, DateTime date)
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst("UserID")?.Value;
            if (userId != null)
            {
                List<string> dates = appointmentService.GetAllAvailableDates(doctorId, date, treatmentId);
                if (dates == null)
                {
                    return NotFound(new { message = "Selected doctory is on holiday or bad treatmentId." });
                }
                else
                {
                    return Ok(dates);
                }
            }
            return NotFound(new { message = "No logged in user" });
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateAppointment(CreateAppointmentViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                var claimsIdentity = User.Identity as ClaimsIdentity;
                var userId = claimsIdentity.FindFirst("UserID")?.Value;
                ApplicationUser patient = await userManager.FindByIdAsync(userId);
                ApplicationUser doctor = await userManager.FindByIdAsync(viewModel.DoctorId);
                if (patient != null && doctor != null)
                {
                    viewModel.PatientId = userId;
                    Appointment appointment = appointmentService.CreateAppointment(viewModel);
                    if (appointment != null)
                    {
                        return Created(nameof(this.CreateAppointment), appointment);
                    }
                }
            }
            return BadRequest(new { message = "Invalid model request" });
        }

        [HttpGet]
        [Route("Deny/{appointmentId}")]
        public IActionResult DenyAppointment(int appointmentId)
        {
            Appointment appointment = appointmentService.DenyAppointment(appointmentId);
            if (appointment != null)
            {
                return Ok(appointment);
            }
            return BadRequest(new { message = "Invalid appointmentId" });
        }

        [HttpGet]
        [Route("Confirm/{appointmentId}")]
        public IActionResult ConfirmAppointment(int appointmentId)
        {
            Appointment appointment = appointmentService.ConfirmAppointment(appointmentId);
            if (appointment != null)
            {
                return Ok(appointment);
            }
            return BadRequest(new { message = "Invalid appointmentId" });
        }
    }
}