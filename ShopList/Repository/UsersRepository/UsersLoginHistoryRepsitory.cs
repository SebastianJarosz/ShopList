using ShopList.Database;
using ShopList.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopList.Repository
{
    public class UsersLoginHistoryRepsitory : AbstractCRUDCreator<UsersLoginHistory, int>
    {
        public UsersLoginHistoryRepsitory(ShopListDbContext context) : base(context)
        {
        }
    }
}
