using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using NLog;
using UprightApi.DBContext;
using UprightApi.Models;
using UprightApi.SystemModels;
using UprightApi.ViewModels;

namespace UprightApi.Repository
{
    public class AttachmentRepo
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();

        public static List<AttachmentViewModel> GetAttachmentList(int pp, int page, string relatedObj, int relatedId)
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    var attachmentList = context.AttachmentView
                        .FromSql(
                            "SELECT * FROM UR_ATTACHMENT WHERE RELATED_OBJECT = {1} AND RELATED_ID = {0}", relatedId, relatedObj)
                        .Skip(pp * (page - 1)).Take(pp).ToList();

                    return attachmentList;
                }
            }
            catch (Exception e)
            {
                Logger.Info("Attachment - GetAttachmentList");
                Logger.Error(e);
                return null;
            }
        }

        public static AttachmentViewModel GetAttachment(int attachmentId)
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    return context.AttachmentView.Find(attachmentId);
                }
            }
            catch (Exception e)
            {
                Logger.Info("Attachment - GetAttachment");
                Logger.Error(e);
                return null;
            }
        }

        public static AttachmentModel SaveAttachment(AttachmentModel attachment)
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    if (attachment.AttachmentId > 0)
                    {
                        context.Attachment.Update(attachment);
                    }
                    else
                    {
                        context.Attachment.Add(attachment);
                    }
                    context.SaveChanges();
                    return attachment;
                }
            }
            catch (Exception e)
            {
                Logger.Info("Attachment - SaveAttachment");
                Logger.Error(e);
                return null;
            }
        }

        public static int GetAttachmentCount(string relatedObj, int relatedId)
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    return context.Attachment.Count(p => p.RelatedObject == relatedObj && p.RelatedId == relatedId.ToString());
                }
            }
            catch (Exception e)
            {
                Logger.Info("Attachment - GetAttachmentCount");
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
                    { "NAME", "A.ATTACHMENT_NAME" },
                    { "DESCRIPTION", "A.ATTACHMENT_DESCRIPTION" },
                    { "TYPE", "A.ATTACHMENT_TYPE" },
                    { "CREATE_DT", "A.ATTACHMENT_CREATE_DT" },
                    { "OBJECT", "RELATED_OBJECT" },
                    { "RELATEID", "RELATED_ID" }
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
                            case "DESCRIPTION":
                                var valueSet = s.Value.Split(',');
                                foreach (var value in valueSet)
                                {
                                    condStr.Append(condStr.Length > 0 ? " OR " : "(");

                                    condStr.Append($"{column} LIKE '%{value}%'");
                                }
                                condStr.Append(")");
                                break;
                            case "TYPE":
                                condStr.Append($"{column} IN ({s.Value})");
                                break;
                            case "OBJECT":
                                condStr.Append($"{column} = '{s.Value}'");
                                break;
                            case "RELATEID":
                                condStr.Append($"{column} = {s.Value}");
                                break;
                        }

                        condition.AppendLine($"AND {condStr}");
                    });
                    var sql =
                        $"SELECT A.* FROM UR_ATTACHMENT A {condition}";
                    var count = context.AttachmentView.FromSql(sql).Count();
                    var attachmentList = context.AttachmentView.FromSql(sql).Skip(pp * (page - 1)).Take(pp).ToList();
                    return new { count, result = attachmentList };
                }
            }
            catch (Exception e)
            {
                Logger.Info("Attachment - Search");
                Logger.Error(e);
                return null;
            }
        }

    }
}
