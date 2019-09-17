using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using WebRegisterAPI.Models;
using WebRegisterAPI.Models.User;
using WebRegisterAPI.Services.IServices;

namespace WebRegisterAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class HospitalController : Controller
    {
        private readonly IHospitalService hospitalService;
        private readonly UserManager<ApplicationUser> userManage;

        public HospitalController(IHospitalService hospitalService, UserManager<ApplicationUser> userManage)
        {
            this.hospitalService = hospitalService;
            this.userManage = userManage;
        }
        [HttpGet]
        [Route("HospitalInfo")]
        public async Task<IActionResult> GetHospitalInfo()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst("UserID")?.Value;
            if (userId != null)
            {
                ApplicationUser user = await userManage.FindByIdAsync(userId);
                Hospital hospital = hospitalService.GetHospital(user.HospitalId);
                return Ok(hospital);
            }
            return NotFound(new { message = "No logged in user" });
        }
    }
}