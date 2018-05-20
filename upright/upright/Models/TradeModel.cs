using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace upright.Models
{
    [Table("UR_TRADE")]
    public class TradeModel
    {
        [Key]
        [Column("TRADE_ID")]
        public int TradeId { get; set; }
        [Column("COMPANY_ID")]
        public int CompanyId { get; set; }
        [Column("TRADE_TYPE")]
        public string TradeType { get; set; }
        [Column("TRADE_INVOICE")]
        public string TradeInvoice { get; set; }
        [Column("TRADE_DATE")]
        public string TradeDate { get; set; }
        [Column("TRADE_NOTE")]
        public string TradeNote { get; set; }
        [NotMapped]
        public List<TradeProductModel> Products { get; set; }
    }
}
