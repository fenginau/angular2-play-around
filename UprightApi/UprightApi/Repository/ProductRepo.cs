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
    public class ProductRepo
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();
        public static List<ProductViewModel> GetAllProduct(int pp, int page)
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    var productList = context.ProductView
                        .FromSql(
                            @"SELECT P.*, CO.COMPANY_NAME FROM UR_PRODUCT P LEFT JOIN UR_COMPANY CO ON P.COMPANY_ID = CO.COMPANY_ID")
                        .Skip(pp * (page - 1)).Take(pp).ToList();

                    return productList;
                }
            }
            catch (Exception e)
            {
                Logger.Info("Product - GetAllProduct");
                Logger.Error(e);
                return null;
            }
        }

        public static List<ProductViewModel> GetCompanyProduct(int pp, int page, int companyId)
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    var productList = context.ProductView
                        .FromSql(
                            @"SELECT P.*, CO.COMPANY_NAME FROM UR_PRODUCT P LEFT JOIN UR_COMPANY CO ON P.COMPANY_ID = CO.COMPANY_ID")
                        .Where(p => p.CompanyId == companyId)
                        .Skip(pp * (page - 1)).Take(pp).ToList();
                    return productList;
                }
            }
            catch (Exception e)
            {
                Logger.Info("Product - GetCompanyProduct");
                Logger.Error(e);
                return null;
            }
        }

        public static ProductViewModel GetProduct(int productId)
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    return context.ProductView
                        .FromSql(
                            $"SELECT P.*, CO.COMPANY_NAME FROM UR_PRODUCT P LEFT JOIN UR_COMPANY CO ON P.COMPANY_ID = CO.COMPANY_ID WHERE P.PRODUCT_ID = {productId}")
                        .FirstOrDefault();
                }
            }
            catch (Exception e)
            {
                Logger.Info("Product - GetProduct");
                Logger.Error(e);
                return null;
            }
        }

        public static ProductModel SaveProduct(ProductModel product)
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    if (product.ProductId > 0)
                    {
                        context.Product.Update(product);
                    }
                    else
                    {
                        context.Product.Add(product);
                    }
                    context.SaveChanges();
                    return product;
                }
            }
            catch (Exception e)
            {
                Logger.Info("Product - SaveProduct");
                Logger.Error(e);
                return null;
            }
        }

        public static int GetProductCount(int companyId)
        {
            try
            {
                using (var context = new BusinessContext())
                {
                    return companyId > 0 ? context.Product.Count(p => p.CompanyId == companyId) : context.Product.Count();
                }
            }
            catch (Exception e)
            {
                Logger.Info("Product - GetProductCount");
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
                    { "NAME", "P.PRODUCT_NAME" },
                    { "DESC", "P.PRODUCT_DESC" },
                    { "COMPANY", "P.COMPANY_ID" }
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
                        }

                        condition.AppendLine($"AND {condStr}");
                    });
                    var sql =
                        $"SELECT P.*, CO.COMPANY_NAME FROM UR_PRODUCT P LEFT JOIN UR_COMPANY CO ON P.COMPANY_ID = CO.COMPANY_ID {condition}";
                    var count = context.ProductView.FromSql(sql).Count();
                    var productList = context.ProductView.FromSql(sql).Skip(pp * (page - 1)).Take(pp).ToList();
                    return new { count, result = productList };
                }
            }
            catch (Exception e)
            {
                Logger.Info("Product - Search");
                Logger.Error(e);
                return null;
            }
        }

    }
}
