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
    public class ContactRepo
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();
        public static List<ContactViewModel> GetAllContact(int pp, int page)
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    var contactList = context.ContactView
                        .FromSql(
                            "SELECT C.*, CO.COMPANY_NAME FROM UR_CONTACT C LEFT JOIN UR_COMPANY CO ON C.COMPANY_ID = CO.COMPANY_ID")
                        .Skip(pp * (page - 1)).Take(pp).ToList();

                    return contactList;
                }
            }
            catch (Exception e)
            {
                Logger.Info("Contact - GetAllContact");
                Logger.Error(e);
                return null;
            }
        }

        public static List<ContactViewModel> GetCompanyContact(int pp, int page, int companyId)
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    var contactList = context.ContactView
                        .FromSql(
                            "SELECT C.*, CO.COMPANY_NAME FROM UR_CONTACT C LEFT JOIN UR_COMPANY CO ON C.COMPANY_ID = CO.COMPANY_ID")
                        .Where(c => c.CompanyId == companyId).Skip(pp * (page - 1)).Take(pp).ToList();

                    return contactList;
                }
            }
            catch (Exception e)
            {
                Logger.Info("Contact - GetCompanyContact");
                Logger.Error(e);
                return null;
            }
        }

        public static ContactViewModel GetContact(int contactId)
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    var contact = context.ContactView
                        .FromSql(
                            $"SELECT C.*, CO.COMPANY_NAME FROM UR_CONTACT C LEFT JOIN UR_COMPANY CO ON C.COMPANY_ID = CO.COMPANY_ID WHERE C.CONTACT_ID = {contactId}")
                        .ToList();
                    return contact.Count > 0 ? contact[0] : null;
                }
            }
            catch (Exception e)
            {
                Logger.Info("Contact - GetContact");
                Logger.Error(e);
                return null;
            }
        }

        public static ContactModel SaveContact(ContactModel contact)
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    if (contact.ContactId > 0)
                    {
                        context.Contact.Update(contact);
                    }
                    else
                    {
                        context.Contact.Add(contact);
                    }
                    context.SaveChanges();
                    return contact;
                }
            }
            catch (Exception e)
            {
                Logger.Info("Contact - SaveContact");
                Logger.Error(e);
                return null;
            }
        }

        public static int GetContactCount(int companyId)
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    return companyId > 0 ? context.Contact.Count(c => c.CompanyId == companyId) : context.Contact.Count();
                }
            }
            catch (Exception e)
            {
                Logger.Info("Contact - GetContactCount");
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
                    { "NAME", "C.CONTACT_NAME" },
                    { "ADDRESS", "C.CONTACT_ADDRESS" },
                    { "EMAIL", "C.CONTACT_EMAIL" },
                    { "PHONE", "C.CONTACT_PHONE1" },
                    { "MOBILE", "C.CONTACT_PHONE2" },
                    { "COMPANY", "C.COMPANY_ID" }
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
                                var valueSet = s.Value.Split(',');
                                foreach (var value in valueSet)
                                {
                                    condStr.Append(condStr.Length > 0 ? " OR " : "(");

                                    condStr.Append($"{column} LIKE '%{value}%'");
                                }
                                condStr.Append(")");
                                break;
                            case "COMPANY":
                                condStr.Append($"{column} IN ({s.Value})");
                                break;
                        }

                        condition.AppendLine($"AND {condStr}");
                    });
                    var sql =
                        $"SELECT C.*, CO.COMPANY_NAME FROM UR_CONTACT C LEFT JOIN UR_COMPANY CO ON C.COMPANY_ID = CO.COMPANY_ID {condition}";
                    var count = context.ContactView.FromSql(sql).Count();
                    var contactList = context.ContactView.FromSql(sql).Skip(pp * (page - 1)).Take(pp).ToList();
                    return new { count, result = contactList };
                }
            }
            catch (Exception e)
            {
                Logger.Info("Contact - Search");
                Logger.Error(e);
                return null;
            }
        }

    }
}
