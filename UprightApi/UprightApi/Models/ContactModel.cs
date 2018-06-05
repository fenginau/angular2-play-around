using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UprightApi.Models
{
    [Table("UR_CONTACT")]
    public class ContactModel
    {
        [Key]
        [Column("CONTACT_ID")]
        public int ContactId { get; set; }
        [Column("CONTACT_NAME")]
        public string ContactName { get; set; }
        [Column("CONTACT_ADDRESS")]
        public string ContactAddress { get; set; }
        [Column("CONTACT_EMAIL")]
        public string ContactEmail { get; set; }
        [Column("CONTACT_PHONE1")]
        public string ContactPhone1 { get; set; }
        [Column("CONTACT_PHONE2")]
        public string ContactPhone2 { get; set; }
        [Column("COMPANY_ID")]
        public int? CompanyId { get; set; }
    }
}