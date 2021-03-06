﻿using Microsoft.EntityFrameworkCore;
using NLog;
using UprightApi.Models;
using UprightApi.ViewModels;
using UprightApi.SystemModels;

namespace UprightApi.DBContext
{
    public class BusinessContext : DbContext
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();

        public virtual DbSet<CompanyModel> Company { get; set; }
        public virtual DbSet<CompanySelectModel> CompanySelect { get; set; }

        public virtual DbSet<ContactModel> Contact { get; set; }
        public virtual DbSet<ContactViewModel> ContactView { get; set; }
        
        public virtual DbSet<ProductModel> Product { get; set; }
        public virtual DbSet<ProductViewModel> ProductView { get; set; }

        public virtual DbSet<TradeModel> Trade { get; set; }
        public virtual DbSet<TradeViewModel> TradeView { get; set; }

        public virtual DbSet<TradeProductModel> TradeProduct { get; set; }
        public virtual DbSet<TradeProductViewModel> TradeProductView { get; set; }

        public virtual DbSet<AttachmentModel> Attachment { get; set; }
        public virtual DbSet<AttachmentViewModel> AttachmentView { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TradeProductModel>()
                .HasKey(t => new { t.TradeId, t.ProductId });
            modelBuilder.Entity<TradeProductViewModel>()
                .HasKey(t => new { t.TradeId, t.ProductId });
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                Logger.Info(AppSettings.ConnectionString);
                optionsBuilder.UseSqlServer(AppSettings.ConnectionString);
            }
        }
    }
}