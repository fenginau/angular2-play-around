﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UprightApi.ViewModels
{
    public class CompanySelectModel
    {
        [Key]
        [Column("COMPANY_ID")]
        public int CompanyId { get; set; }
        [Column("COMPANY_NAME")]
        public string CompanyName { get; set; }
    }
}
