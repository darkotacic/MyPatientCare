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
    public class HolidayController : Controller
    {
        private readonly IHolidayService holidayService;

        public HolidayController(IHolidayService holidayService)
        {
            this.holidayService = holidayService;
        }

        [HttpGet]
        public IActionResult GetHolidaysForDoctor()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst("UserID")?.Value;
            if (userId != null)
            {
                List<HolidayViewModel> model = holidayService.GetHolidays(userId);
                return Ok(model);
            }
            return NotFound(new { message = "No logged in user" });
        }

        [HttpPost]
        public IActionResult CreateHoliday(Holiday holiday)
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst("UserID")?.Value;
            if (userId != null)
            {
                Holiday model = holidayService.CreateHoliday(holiday, userId);
                return Ok(model);
            }
            return NotFound(new { message = "No logged in user" });
        }

        [HttpGet]
        [Route("{holidayId}")]
        public IActionResult GetHoliday(int holidayId)
        {

            Holiday holiday = holidayService.GetHolidayById(holidayId);
            if (holiday != null)
            {
                return Ok(holiday);
            }
            return NotFound(new { message = "No holiday for the given id" });
        }
        [HttpPut]
        public IActionResult UpdateHoliday(Holiday holiday)
        {

            var claimsIdentity = User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst("UserID")?.Value;
            if (userId != null)
            {
                Holiday newSchedule = holidayService.UpdateHoliday(holiday);
                return Ok(newSchedule);
            }
            return NotFound(new { message = "No logged in user" });
        }
    }
}