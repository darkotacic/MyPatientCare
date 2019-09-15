using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebRegisterAPI.Models;
using WebRegisterAPI.Services.IServices;
using WebRegisterAPI.ViewModels;

namespace WebRegisterAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ScheduleController : Controller
    {
        private readonly IScheduleService scheduleService;

        public ScheduleController(IScheduleService scheduleService)
        {
            this.scheduleService = scheduleService;
        }

        [HttpGet]
        public IActionResult GetSchedulesForDoctor()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst("UserID")?.Value;
            if (userId != null)
            {
                SchedulesViewModel model = scheduleService.GetAllSchedulesForDoctor(userId);
                return Ok(model);
            }
            return NotFound(new { message = "No logged in user" });
        }

        [HttpGet]
        [Route("{scheduleId}")]
        public IActionResult GetSchedule(int scheduleId)
        {

            SchedulesViewModel viewModel = scheduleService.GetScheduleById(scheduleId);
            if (viewModel != null)
            {
                return Ok(viewModel);
            }
            return NotFound(new { message = "No schedule for the given id" });

        }

        [HttpGet]
        [Route("FreeDays")]
        public IActionResult GetFreeDays()
        {

            var claimsIdentity = User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst("UserID")?.Value;
            if (userId != null)
            {
                FreeDaysViewModel viewModel = scheduleService.GetFreeDays(userId);
                return Ok(viewModel);
            }
            return NotFound(new { message = "No logged in user" });
        }

        [HttpPost]
        public IActionResult CreateSchedule(Schedule schedule)
        {

            var claimsIdentity = User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst("UserID")?.Value;
            if (userId != null)
            {
                schedule.DoctorId = userId;
                Schedule newSchedule = scheduleService.CreateSchedule(schedule);
                return Ok(newSchedule);
            }
            return NotFound(new { message = "No logged in user" });
        }

        [HttpPut]
        public IActionResult UpdateSchedule(Schedule schedule)
        {

            var claimsIdentity = User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst("UserID")?.Value;
            if (userId != null)
            {
                schedule.DoctorId = userId;
                Schedule newSchedule = scheduleService.UpdateSchedule(schedule);
                return Ok(newSchedule);
            }
            return NotFound(new { message = "No logged in user" });
        }
    }
}