using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace upright.Models
{
    public class AttachmentViewModel
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
        [Column("ATTACHMENT_TYPE_STR")]
        public string AttachmentTypeStr { get; set; }
    }
}
