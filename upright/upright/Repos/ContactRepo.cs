using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using NLog;
using upright.DBContext;
using upright.Models;

namespace upright.Repos
{
    public class ContactRepo
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();
        public static List<ContactViewModel> GetAllContact()
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    var contactList = context.ContactView.FromSql("SELECT C.*, CO.COMPANY_NAME FROM UR_CONTACT C LEFT JOIN UR_COMPANY CO ON C.COMPANY_ID = CO.COMPANY_ID").ToList();

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

        public static ContactViewModel GetContact(int contactId)
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    var contact = context.ContactView.FromSql($"SELECT C.*, CO.COMPANY_NAME FROM UR_CONTACT C LEFT JOIN UR_COMPANY CO ON C.COMPANY_ID = CO.COMPANY_ID WHERE C.CONTACT_ID = {contactId}").ToList();
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
                Logger.Info("Contact - SaveContact");
                Logger.Error(e);
                return false;
            }
        }
    }
}
