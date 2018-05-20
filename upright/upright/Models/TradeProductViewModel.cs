using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace upright.Models
{
    public class TradeProductViewModel
    {
        [Column("TRADE_ID")]
        public int TradeId { get; set; }
        [Column("PRODUCT_ID")]
        public int ProductId { get; set; }
        [Column("UNIT_PRICE")]
        public double UnitPrice { get; set; }
        [Column("QUANTITY")]
        public int Quantity { get; set; }
        [Column("PRODUCT_NAME")]
        public string ProductName { get; set; }
    }
}
