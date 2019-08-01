using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebRegisterAPI.Models;
using WebRegisterAPI.Models.User;
using WebRegisterAPI.Repositories.IRepositories;
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
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst("UserID")?.Value;
            if (userId != null)
            {
                List<AppointmentViewModel> appointments = appointmentService.GetAllUserAppointments(userId);
                return Ok(appointments);
            }
            return NotFound(new { message = "No logged in user" });
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateAppointment(CreateAppointmentViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser patient = await userManager.FindByIdAsync(viewModel.PatientId);
                ApplicationUser doctor = await userManager.FindByIdAsync(viewModel.DoctorId);
                if (patient != null && doctor != null)
                {
                    Appointment appointment = appointmentService.CreateAppointment(viewModel);
                    if (appointment != null)
                    {
                        return Created(nameof(this.CreateAppointment), appointment);
                    }
                }
            }
            return BadRequest(new { message = "Invalid model request" });
        }
    }
}