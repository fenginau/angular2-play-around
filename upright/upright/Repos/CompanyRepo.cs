using System;
using System.Collections.Generic;
using System.Linq;
using NLog;
using upright.DBContext;
using upright.Models;

namespace upright.Repos
{
    public class CompanyRepo
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();
        public static List<CompanyModel> GetAllCompany()
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    var companyList = context.Company.ToList();
                    return companyList;
                }
            }
            catch (Exception e)
            {
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
                Logger.Error(e);
                return null;
            }
        }

        public static bool SaveCompany(CompanyModel company)
        {
            Logger.Info(company.CompanyId);
            Logger.Info(company.CompanyName);
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
                Logger.Error(e);
                return false;
            }
        }
    }
}
