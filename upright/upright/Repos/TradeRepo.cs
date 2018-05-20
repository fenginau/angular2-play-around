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
    public class TradeRepo
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();
        public static List<TradeViewModel> GetAllTrade(int pp, int page)
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    var tradeList = context.TradeView
                        .FromSql(
                            @"SELECT T.*, CO.COMPANY_NAME FROM UR_TRADE T LEFT JOIN UR_COMPANY CO ON T.COMPANY_ID = CO.COMPANY_ID")
                        .Skip(pp * (page - 1)).Take(pp).ToList();

                    return tradeList;
                }
            }
            catch (Exception e)
            {
                Logger.Info("Trade - GetAllTrade");
                Logger.Error(e);
                return null;
            }
        }

        public static List<TradeViewModel> GetCompanyTrade(int pp, int page, int companyId)
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    var tradeList = context.TradeView
                        .FromSql(
                            @"SELECT T.*, CO.COMPANY_NAME FROM UR_TRADE T LEFT JOIN UR_COMPANY CO ON T.COMPANY_ID = CO.COMPANY_ID")
                        .Where(p => p.CompanyId == companyId)
                        .Skip(pp * (page - 1)).Take(pp).ToList();
                    return tradeList;
                }
            }
            catch (Exception e)
            {
                Logger.Info("Trade - GetCompanyTrade");
                Logger.Error(e);
                return null;
            }
        }

        public static TradeViewModel GetTrade(int tradeId)
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    var trade = context.TradeView
                        .FromSql(
                            $"SELECT T.*, CO.COMPANY_NAME FROM UR_TRADE T LEFT JOIN UR_COMPANY CO ON T.COMPANY_ID = CO.COMPANY_ID WHERE T.TRADE_ID = {tradeId}")
                        .FirstOrDefault();

                    if (trade != null)
                    {
                        trade.Products = context.TradeProductView
                            .FromSql(
                                "SELECT T.*, P.PRODUCT_NAME FROM UR_TRADE_PRODUCT T LEFT JOIN UR_PRODUCT P ON T.PRODUCT_ID = P.PRODUCT_ID")
                            .Where(p => p.TradeId == tradeId).ToList();
                    }

                    return trade;
                }
            }
            catch (Exception e)
            {
                Logger.Info("Trade - GetTrade");
                Logger.Error(e);
                return null;
            }
        }

        public static TradeModel SaveTrade(TradeModel trade)
        {
            using (var context = new BusinessContext())
            {
                using (var transaction = context.Database.BeginTransaction())
                {
                    try
                    {
                        if (trade.TradeId > 0)
                        {
                            context.Trade.Update(trade);
                        }
                        else
                        {
                            context.Trade.Add(trade);
                        }

                        context.SaveChanges();
                        //delete all the products belong to this trade
                        context.TradeProduct.RemoveRange(context.TradeProduct.Where(p => p.TradeId == trade.TradeId));
                        context.SaveChanges();
                        //set trade id to the products and save them
                        trade.Products.ForEach(product => { product.TradeId = trade.TradeId; });
                        context.TradeProduct.AddRange(trade.Products);
                        context.SaveChanges();
                        transaction.Commit();
                        return trade;
                    }
                    catch (Exception e)
                    {
                        transaction.Rollback();
                        Logger.Info("Trade - SaveTrade");
                        Logger.Error(e);
                        return null;
                    }
                }
            }
        }

        public static int GetTradeCount(int companyId)
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    return companyId > 0 ? context.Trade.Count(p => p.CompanyId == companyId) : context.Trade.Count();
                }
            }
            catch (Exception e)
            {
                Logger.Info("Trade - GetTradeCount");
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
                    { "DATE", "T.TRADE_DATE" },
                    { "INVOICE", "T.TRADE_INVOICE" },
                    { "TYPE", "T.TRADE_TYPE" },
                    { "COMPANY", "T.COMPANY_ID" }
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
                            case "DESC":
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
                            case "TYPE":
                                condStr.Append($"{column} = {s.Value}");
                                break;
                        }

                        condition.AppendLine($"AND {condStr}");
                    });
                    var sql =
                        $"SELECT T.*, CO.COMPANY_NAME FROM UR_TRADE T LEFT JOIN UR_COMPANY CO ON T.COMPANY_ID = CO.COMPANY_ID {condition}";
                    var count = context.TradeView.FromSql(sql).Count();
                    var tradeList = context.TradeView.FromSql(sql).Skip(pp * (page - 1)).Take(pp).ToList();
                    return new { count, result = tradeList };
                }
            }
            catch (Exception e)
            {
                Logger.Info("Trade - Search");
                Logger.Error(e);
                return null;
            }
        }

    }
}
