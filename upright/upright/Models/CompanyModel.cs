using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace upright.Models
{
    [Table("UR_COMPANY")]
    public class CompanyModel
    {
        [Key]
        [Column("COMPANY_ID")]
        public int CompanyId { get; set; }
        [Column("COMPANY_NAME")]
        public string CompanyName { get; set; }
        [Column("COMPANY_ADDRESS")]
        public string CompanyAddress { get; set; }
        [Column("COMPANY_EMAIL")]
        public string CompanyEmail { get; set; }
        [Column("COMPANY_PHONE1")]
        public string CompanyPhone1 { get; set; }
        [Column("COMPANY_PHONE2")]
        public string CompanyPhone2 { get; set; }
        [Column("COMPANY_ABN")]
        public string CompanyAbn { get; set; }
        [Column("COMPANY_ACN")]
        public string CompanyAcn { get; set; }
    }
}
