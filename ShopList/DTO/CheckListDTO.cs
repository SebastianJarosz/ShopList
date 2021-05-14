using ShopList.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ShopList.DTO
{ 
    public class CheckListDTO
    {
        public int Id { get; set; }
        public string ListName { get; set; }
        public string ListPostion { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LastModficationDate { get; set; }
        public float ShopPrice { get; set; }
        public CheckListStatus Status { get; set; }
    }
}