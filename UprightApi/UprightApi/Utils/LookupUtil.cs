using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using NLog;
using UprightApi.DBContext;
using UprightApi.SystemModels;

namespace UprightApi.Utils
{
    public class LookupUtil
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();
        public static string GetAttachmentType(int key)
        {
            if (Lookups.AttachmentType == null)
            {
                Lookups.AttachmentType = GetLookupPair("ATTACHMENT_TYPE");
            }

            return Lookups.AttachmentType?[key];
        }

        public static Dictionary<int, string> GetLookupPair(string field)
        {
            try
            {
                using (var context = new SystemContext())
                {
                    return context.Lookup.FromSql(
                        "SELECT LOOKUP_KEY, LOOKUP_VALUE FROM S_LOOKUP_ITEM I LEFT JOIN S_LOOKUP L ON I.LOOKUP_ID = L.LOOKUP_ID WHERE L.LOOKUP_FIELD = {0}",
                        field).ToDictionary(p => p.Key, p => p.Value);
                }
            }
            catch (Exception e)
            {
                Logger.Info("Lookup - GetLookupPair");
                Logger.Error(e);
                return null;
            }
        }
    }
}
