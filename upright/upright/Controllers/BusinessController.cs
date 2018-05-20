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
            if (CompanyRepo.SaveCompany(company) != null)
            {
                return Ok(company);
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

        [HttpGet("[action]")]
        public IActionResult GetCompanyName(int companyId)
        {
            try
            {
                var name = CompanyRepo.GetCompanyName(companyId);
                return new ObjectResult(name);
            }
            catch (Exception e)
            {
                return StatusCode(500);
            }
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
        public IActionResult GetCompanyContact(int pp, int page, int company)
        {
            var contactList = ContactRepo.GetCompanyContact(pp, page, company);
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
            if (ContactRepo.SaveContact(contact) != null)
            {
                return Ok(contact);
            }
            return StatusCode(500);
        }

        [HttpGet("[action]")]
        public IActionResult GetContactCount(int company)
        {
            var count = ContactRepo.GetContactCount(company);
            if (count > -1)
            {
                return new ObjectResult(count);
            }
            return StatusCode(500);
        }


        #endregion

        #region product
        [HttpGet("[action]")]
        public IActionResult GetAllProduct(int pp, int page)
        {
            var productList = ProductRepo.GetAllProduct(pp, page);
            if (productList != null)
            {
                return new ObjectResult(productList);
            }
            return StatusCode(500);
        }

        [HttpGet("[action]")]
        public IActionResult GetCompanyProduct(int pp, int page, int company)
        {
            var productList = ProductRepo.GetCompanyProduct(pp, page, company);
            if (productList != null)
            {
                return new ObjectResult(productList);
            }
            return StatusCode(500);
        }

        [HttpGet("[action]")]
        public IActionResult GetProduct(int productId)
        {
            var product = ProductRepo.GetProduct(productId);
            if (product != null)
            {
                return new ObjectResult(product);
            }
            return StatusCode(500);
        }

        [HttpPost("[action]")]
        public IActionResult SaveProduct([FromBody] ProductModel product)
        {
            if (ProductRepo.SaveProduct(product) != null)
            {
                return Ok(product);
            }
            return StatusCode(500);
        }

        [HttpGet("[action]")]
        public IActionResult GetProductCount(int company)
        {
            var count = ProductRepo.GetProductCount(company);
            if (count > -1)
            {
                return new ObjectResult(count);
            }
            return StatusCode(500);
        }
        #endregion

        #region trade
        [HttpGet("[action]")]
        public IActionResult GetAllTrade(int pp, int page)
        {
            var tradeList = TradeRepo.GetAllTrade(pp, page);
            if (tradeList != null)
            {
                return new ObjectResult(tradeList);
            }
            return StatusCode(500);
        }

        [HttpGet("[action]")]
        public IActionResult GetCompanyTrade(int pp, int page, int company)
        {
            var tradeList = TradeRepo.GetCompanyTrade(pp, page, company);
            if (tradeList != null)
            {
                return new ObjectResult(tradeList);
            }
            return StatusCode(500);
        }

        [HttpGet("[action]")]
        public IActionResult GetTrade(int tradeId)
        {
            var trade = TradeRepo.GetTrade(tradeId);
            if (trade != null)
            {
                return new ObjectResult(trade);
            }
            return StatusCode(500);
        }

        [HttpGet("[action]")]
        public IActionResult GetTradeCount(int company)
        {
            var count = TradeRepo.GetTradeCount(company);
            if (count > -1)
            {
                return new ObjectResult(count);
            }
            return StatusCode(500);
        }

        [HttpPost("[action]")]
        public IActionResult SaveTrade([FromBody] TradeModel trade)
        {
            if (TradeRepo.SaveTrade(trade) != null)
            {
                return Ok(trade);
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
                        return new ObjectResult(companyList);
                    }
                    break;
                case "CONTACT":
                    var contactList = ContactRepo.Search(searchParamList, pp, page);
                    if (contactList != null)
                    {
                        return new ObjectResult(contactList);
                    }
                    break;
                case "TRADE":
                    var tradeList = TradeRepo.Search(searchParamList, pp, page);
                    if (tradeList != null)
                    {
                        return new ObjectResult(tradeList);
                    }
                    break;
                case "PRODUCT":
                    var productList = ProductRepo.Search(searchParamList, pp, page);
                    if (productList != null)
                    {
                        return new ObjectResult(productList);
                    }
                    break;

            }
            return StatusCode(500);
        }

        #endregion

    }
}
