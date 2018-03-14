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
        #region company
        [HttpGet("[action]")]
        public IActionResult GetAllCompany(int pp, int page)
        {
            var companyList = CompanyRepo.GetAllCompany(pp, page);
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

        [HttpGet("[action]")]
        public IActionResult GetCompanySelect()
        {
            var companyList = CompanyRepo.GetCompanySelect();
            if (companyList != null)
            {
                return new ObjectResult(companyList);
            }
            return StatusCode(500);
        }

        [HttpGet("[action]")]
        public IActionResult GetCompanyCount()
        {
            var count = CompanyRepo.GetCompanyCount();
            if (count > -1)
            {
                return new ObjectResult(count);
            }
            return StatusCode(500);
        }

        #endregion

        #region contact
        [HttpGet("[action]")]
        public IActionResult GetAllContact(int pp, int page)
        {
            var contactList = ContactRepo.GetAllContact(pp, page);
            if (contactList != null)
            {
                return new ObjectResult(contactList);
            }
            return StatusCode(500);
        }

        [HttpGet("[action]")]
        public IActionResult GetContact(int contactId)
        {
            var contact = ContactRepo.GetContact(contactId);
            if (contact != null)
            {
                return new ObjectResult(contact);
            }
            return StatusCode(500);
        }

        [HttpPost("[action]")]
        public IActionResult SaveContact([FromBody] ContactModel contact)
        {
            if (ContactRepo.SaveContact(contact))
            {
                return Ok();
            }
            return StatusCode(500);
        }

        [HttpGet("[action]")]
        public IActionResult GetContactCount()
        {
            var count = ContactRepo.GetContactCount();
            if (count > -1)
            {
                return new ObjectResult(count);
            }
            return StatusCode(500);
        }


        #endregion

        #region search

        [HttpPost("[action]")]
        public IActionResult Search(string module, int pp, int page, [FromBody] List<SearchParamModel> searchParamList)
        {
            switch (module.ToUpper())
            {
                case "COMPANY":
                    var companyList = CompanyRepo.Search(searchParamList, pp, page);
                    if (companyList != null)
                    {
                        return new ObjectResult(companyList); ;
                    }
                    break;
                case "CONTACT":
                    var contactList = ContactRepo.Search(searchParamList, pp, page);
                    if (contactList != null)
                    {
                        return new ObjectResult(contactList); ;
                    }
                    break;
                case "TRADE":
                    break;
                case "PRODUCT":
                    break;

            }
            return StatusCode(500);
        }

        #endregion
    }
}
