using Microsoft.EntityFrameworkCore;
using ShopList.Database;
using ShopList.Models.ShopingListsModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopList.Repository.CheckListRepository
{
    public class CheckListRepository : AbstractCRUDCreator<CheckList, string>
    {
        public CheckListRepository(ShopListDbContext context) : base(context)
        {
        }
        public override async Task<ICollection<CheckList>> GetAllAsync(string key, string status)
        {
            return await _context.Set<CheckList>().Where(x => x.UserId == key && x.Status == (CheckListStatus)Int16.Parse(status)).ToListAsync();
        }
        public override async Task<CheckList> GetAsync(string key)
        {
            int intKey = Int32.Parse(key);
            return await _context.Set<CheckList>().FindAsync(intKey);
        }
        public override async Task<CheckList> UpdateAsync(CheckList updated, string key)
        {
            if (updated == null)
                return null;

            CheckList existing = await _context.Set<CheckList>().FindAsync(Int32.Parse(key));
            if (existing != null)
            {
                _context.Entry(existing).CurrentValues.SetValues(updated);
                await _context.SaveChangesAsync();
            }
            return existing;
        }
    }
}
