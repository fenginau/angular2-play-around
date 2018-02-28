using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using upright.Models;

namespace upright.DBContext
{
    public class UprightContext : DbContext
    {
        public virtual DbSet<CompanyModel> Company { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Server=FENG\FENG;Database=UPRIGHT;User Id=sa;Password=greenacres;");
            }
        }
    }
}
