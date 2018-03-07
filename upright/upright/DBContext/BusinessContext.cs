using Microsoft.EntityFrameworkCore;
using NLog;
using upright.Models;

namespace upright.DBContext
{
    public class BusinessContext : DbContext
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();

        public virtual DbSet<CompanyModel> Company { get; set; }
        public virtual DbSet<ContactModel> Contact { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(AppSettings.ConnectionString);
            }
        }
    }
}