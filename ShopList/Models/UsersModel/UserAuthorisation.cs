using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ShopList.Models
{
    public class UserAuthorisation
    {
        [Key]
        public int Id { get; set; }

        public string UserGuid { get; set; }

        [ForeignKey("UserGuid")]
        public User User { get; set; }

        [Required]
        public int Status { get; set; }
        
        [DataType(DataType.Date)]
        public DateTime RegistryDate { get; set; }

        [DataType(DataType.Date)]
        public DateTime ExpireDate { get; set; }

    }
}
