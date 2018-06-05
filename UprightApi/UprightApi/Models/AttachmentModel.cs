using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UprightApi.Models
{
    [Table("UR_ATTACHMENT")]
    public class AttachmentModel
    {
        [Key]
        [Column("ATTACHMENT_ID")]
        public int AttachmentId { get; set; }
        [Column("ATTACHMENT_NAME")]
        public string AttachmentName { get; set; }
        [Column("ATTACHMENT_DESCRIPTION")]
        public string AttachmentDescription { get; set; }
        [Column("ATTACHMENT_TYPE")]
        public int AttachmentType { get; set; }
        [Column("ATTACHMENT_CREATE_DT")]
        public DateTime AttachmentCreateDt { get; set; }
        [Column("RELATED_OBJECT")]
        public string RelatedObject { get; set; }
        [Column("RELATED_ID")]
        public string RelatedId { get; set; }
    }
}
