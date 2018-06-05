using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UprightApi.ViewModels
{
    public class ProductViewModel
    {
        [Key]
        [Column("PRODUCT_ID")]
        public int ProductId { get; set; }
        [Column("COMPANY_ID")]
        public int CompanyId { get; set; }
        [Column("PRODUCT_NAME")]
        public string ProductName { get; set; }
        [Column("PRODUCT_DESC")]
        public string ProductDesc { get; set; }
        [Column("COMPANY_NAME")]
        public string CompanyName { get; set; }
    }
}
