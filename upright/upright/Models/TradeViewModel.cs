using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace upright.Models
{
    public class TradeViewModel
    {
        [Key]
        [Column("TRADE_ID")]
        public int TradeId { get; set; }
        [Column("COMPANY_ID")]
        public int CompanyId { get; set; }
        [Column("TRADE_TYPE")]
        public int TradeType { get; set; }
        [Column("TRADE_INVOICE")]
        public string TradeInvoice { get; set; }
        [Column("TRADE_DATE")]
        public DateTime TradeDate { get; set; }
        [Column("TRADE_NOTE")]
        public string TradeNote { get; set; }
        [NotMapped]
        public List<TradeProductViewModel> Products { get; set; }
        [Column("COMPANY_NAME")]
        public string CompanyName { get; set; }

    }
}
