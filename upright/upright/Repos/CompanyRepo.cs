using System;
using System.Collections.Generic;
using System.Linq;
using upright.DBContext;
using upright.Models;

namespace upright.Repos
{
    public class CompanyRepo
    {
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
                Console.WriteLine(e);
                return null;
            }
        }
    }
}
