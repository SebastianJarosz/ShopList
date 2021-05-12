using ShopList.Database;
using ShopList.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ShopList.Repository
{
    public class UserAuthorisationRepository : AbstractCRUDCreator<UserAuthorisation, string>
    {
        public UserAuthorisationRepository(ShopListDbContext context) : base(context)
        {
        }

        public new UserAuthorisation Get(string key)
        {
            var userAuthorisation =  _context.UserAuthorisation.Where(x => x.UserGuid == key
                                            && x.ExpireDate > DateTime.Today
                                            && x.Status == 0 ).FirstOrDefault();
            return userAuthorisation;
        }
    }
}
