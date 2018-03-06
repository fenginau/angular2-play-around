using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Azure.KeyVault.Models;
using Microsoft.EntityFrameworkCore;
using NLog;
using upright.DBContext;
using upright.Models;

namespace upright.Repos
{
    public class ContactRepo
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();
        public static List<ContactModel> GetAllContact()
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    var contactList = context.Contact.FromSql("SELECT C.*, CO.COMPANY_NAME AS CompanyName FROM UR_CONTACT C LEFT JOIN UR_COMPANY CO ON C.COMPANY_ID = CO.COMPANY_ID").ToList();
                    //contactList.ForEach(contact =>
                    //{
                    //    contact.CompanyName = context.Company.Where(c => c.CompanyId == contact.CompanyId).Select(o => o.CompanyName).ToString();
                    //});

                    return contactList;
                }
            }
            catch (Exception e)
            {
                Logger.Error(e);
                return null;
            }
        }

        public static ContactModel GetContact(int contactId)
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    var contact = context.Contact.FromSql($"SELECT C.*, CO.COMPANY_NAME AS CompanyName FROM UR_CONTACT C LEFT JOIN UR_COMPANY CO ON C.COMPANY_ID = CO.COMPANY_ID WHERE C.CONTACT_ID = {contactId}").ToList();
                    return contact.Count > 0 ? contact[0] : null;
                }
            }
            catch (Exception e)
            {
                Logger.Error(e);
                return null;
            }
        }

        public static bool SaveContact(ContactModel contact)
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
