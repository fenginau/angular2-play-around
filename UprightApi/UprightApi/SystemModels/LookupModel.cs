using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UprightApi.SystemModels
{
    public class LookupModel
    {
        [Key]
        [Column("LOOKUP_KEY")]
        public int Key { get; set; }
        [Column("LOOKUP_VALUE")]
        public string Value { get; set; }
    }
}
