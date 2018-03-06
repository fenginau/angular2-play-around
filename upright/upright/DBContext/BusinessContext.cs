using Microsoft.EntityFrameworkCore;
using upright.Models;

namespace upright.DBContext
{
    public class BusinessContext : DbContext
    {
        public virtual DbSet<CompanyModel> Company { get; set; }
        public virtual DbSet<ContactModel> Contact { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Server=localhost;Database=UPRIGHT;User Id=sa;Password=Gr33nacres;");
                //optionsBuilder.UseSqlServer(@"Server=FENG\FENG;Database=UPRIGHT;User Id=sa;Password=greenacres;");
            }
        }
    }
}