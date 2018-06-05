using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UprightApi.Models
{
    [Table("UR_TRADE_PRODUCT")]
    public class TradeProductModel
    {
        [Column("TRADE_ID")]
        public int TradeId { get; set; }
        [Column("PRODUCT_ID")]
        public int ProductId { get; set; }
        [Column("UNIT_PRICE")]
        public double UnitPrice { get; set; }
        [Column("QUANTITY")]
        public int Quantity { get; set; }
    }
}
