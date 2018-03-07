using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using NLog;
using upright.DBContext;
using upright.Models;

namespace upright.Repos
{
    public class CompanyRepo
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();
        public static List<CompanyModel> GetAllCompany(int pp, int page)
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    var companyList = context.Company.Skip(pp * (page - 1)).Take(pp).ToList();
                    return companyList;
                }
            }
            catch (Exception e)
            {
                Logger.Info("Company - GetAllCompany");
                Logger.Error(e);
                return null;
            }
        }

        public static CompanyModel GetCompany(int companyId)
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    var company = context.Company.Find(companyId);
                    return company;
                }
            }
            catch (Exception e)
            {
                Logger.Info("Company - GetCompany");
                Logger.Error(e);
                return null;
            }
        }

        public static bool SaveCompany(CompanyModel company)
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    if (company.CompanyId > 0)
                    {
                        context.Company.Update(company);
                    }
                    else
                    {
                        context.Company.Add(company);
                    }
                    context.SaveChanges();
                    return true;
                }
            }
            catch (Exception e)
            {
                Logger.Info("Company - SaveCompany");
                Logger.Error(e);
                return false;
            }
        }

        public static List<CompanySelectModel> GetCompanySelect()
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    var companyList = context.CompanySelect.FromSql("SELECT COMPANY_ID, COMPANY_NAME FROM UR_COMPANY ORDER BY COMPANY_NAME").ToList();
                    return companyList;
                }
            }
            catch (Exception e)
            {
                Logger.Info("Company - GetCompanySelect");
                Logger.Error(e);
                return null;
            }
        }

        public static int GetCompanyCount()
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    var count = context.Company.Count();
                    return count;
                }
            }
            catch (Exception e)
            {
                Logger.Info("Company - GetCompanyCount");
                Logger.Error(e);
                return -1;
            }
        }
    }
}
