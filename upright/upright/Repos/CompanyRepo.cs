using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

        public static dynamic Search(List<SearchParamModel> searchParams, int pp, int page)
        {
            try
            {
                var dic = new Dictionary<string, string>
                {
                    { "NAME", "COMPANY_NAME" },
                    { "ADDRESS", "COMPANY_ADDRESS" },
                    { "EMAIL", "COMPANY_EMAIL" },
                    { "PHONE", "COMPANY_PHONE1" },
                    { "MOBILE", "COMPANY_PHONE2" },
                    { "ABN", "COMPANY_ABN" },
                    { "ACN", "COMPANY_ACN" }
                };

                using (var context = new BusinessContext())
                {
                    var condition = new StringBuilder();
                    StringBuilder condStr;
                    condition.AppendLine("WHERE 1 = 1");
                    searchParams.ForEach(s =>
                    {
                        condStr = new StringBuilder();
                        var column = dic[s.Key.ToUpper()];
                        switch (s.Key.ToUpper())
                        {
                            case "NAME":
                            case "ADDRESS":
                            case "EMAIL":
                            case "PHONE":
                            case "MOBILE":
                            case "ABN":
                            case "ACN":
                                var valueSet = s.Value.Split(',');
                                foreach (var value in valueSet)
                                {
                                    condStr.Append(condStr.Length > 0 ? " OR " : "(");

                                    condStr.Append($"{column} LIKE '%{value}%'");
                                }
                                condStr.Append(")");
                                break;
                        }

                        condition.AppendLine($"AND {condStr}");
                    });
                    var sql = $"SELECT * FROM UR_COMPANY {condition}";
                    var count = context.Company.FromSql(sql).Count();
                    var companyList = context.Company.FromSql(sql).Skip(pp * (page - 1)).Take(pp).ToList();
                    return new { count, result = companyList };
                }
            }
            catch (Exception e)
            {
                Logger.Info("Company - Search");
                Logger.Error(e);
                return null;
            }
        }
    }
}
