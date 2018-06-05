using Microsoft.EntityFrameworkCore;
using NLog;
using UprightApi.SystemModels;

namespace UprightApi.DBContext
{
    public class SystemContext : DbContext
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();

        public virtual DbSet<LookupModel> Lookup { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(AppSettings.ConnectionString);
            }
        }
    }
}