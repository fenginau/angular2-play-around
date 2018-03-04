using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using upright.DBContext;
using upright.Models;
using upright.Repos;

namespace Upright.Controllers
{
    [Route("api/[controller]")]
    public class BusinessController : Controller
    {
        [HttpGet("[action]")]
        public IActionResult GetAllCompany()
        {
            var companyList = CompanyRepo.GetAllCompany();
            if (companyList != null)
            {
                return new ObjectResult(companyList);
            }
            return StatusCode(500);
        }

        [HttpGet("[action]")]
        public IActionResult GetCompany(int companyId)
        {
            var company = CompanyRepo.GetCompany(companyId);
            if (company != null)
            {
                return new ObjectResult(company);
            }
            return StatusCode(500);
        }

        [HttpPost("[action]")]
        public IActionResult SaveCompany([FromBody] CompanyModel company)
        {
            if (CompanyRepo.SaveCompany(company))
            {
                return Ok();
            }
            return StatusCode(500);
        }
    }
}
