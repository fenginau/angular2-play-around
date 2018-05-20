using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace upright.Models
{
    [Table("UR_TRADE_PRODUCT")]
    public class TradeProductModel
    {
        [Column("TRADE_ID")]
        public int TradeId { get; set; }
        [Column("PRODUCT_ID")]
        public int ProductId { get; set; }
        [Column("UNIT_PRICE")]
        public string UnitPrice { get; set; }
        [Column("QUANTITY")]
        public string Quantity { get; set; }
    }
}
