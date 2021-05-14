using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ShopList.Models.ShopingListsModel
{
    public class CheckList
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string ListName { get; set; }
        [Required]
        public string ListPostion { get; set; }
        [Required]
        public DateTime CreationDate { get; set; }
        [Required]
        public DateTime LastModficationDate { get; set; }
        public float ShopPrice { get; set; }
        [Required]
        public CheckListStatus Status { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}
public enum CheckListStatus
{
    Active,
    Old,
    Shered,
    Removed
}