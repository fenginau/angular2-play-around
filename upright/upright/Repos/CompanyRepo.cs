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
        public static List<CompanyModel> GetAllCompanyList()
        {
            try
            {
                using (var context = new UprightContext())
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
    }
}
