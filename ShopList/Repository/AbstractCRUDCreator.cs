using Microsoft.EntityFrameworkCore;
using ShopList.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopList.Repository
{
    public class AbstractCRUDCreator<TObject, Key> where TObject : class
    {
        protected readonly ShopListDbContext _context;
        public AbstractCRUDCreator(ShopListDbContext context)
        {
            _context = context;
        }
        public ICollection<TObject> GetAll()
        {
            return _context.Set<TObject>().ToList();
        }
        public virtual ICollection<TObject> GetAll(Key key)
        {
            return _context.Set<TObject>().ToList();
        }

        public async Task<ICollection<TObject>> GetAllAsync()
        {
            return await _context.Set<TObject>().ToListAsync();
        }
        public async Task<ICollection<TObject>> GetAllAsync(Key key)
        {
            return await _context.Set<TObject>().ToListAsync();
        }
        public TObject Get(Key key)
        {
            return _context.Set<TObject>().Find(key);
        }

        public async Task<TObject> GetAsync(Key key)
        {
            return await _context.Set<TObject>().FindAsync(key);
        }
        public TObject Add(TObject t)
        {
            _context.Set<TObject>().Add(t);
            _context.SaveChanges();
            return t;
        }

        public virtual async Task<TObject> AddAsync(TObject t)
        {
            _context.Set<TObject>().Add(t);
            await _context.SaveChangesAsync();
            return t;
        }

        public async void Save()
        {
            await _context.SaveChangesAsync();
        }

        public TObject Update(TObject updated, Key key)
        {
            if (updated == null)
                return null;

            TObject existing = _context.Set<TObject>().Find(key);
            if (existing != null)
            {
                _context.Entry(existing).CurrentValues.SetValues(updated);
                _context.SaveChanges();
            }
            return existing;
        }

        public virtual async Task<TObject> UpdateAsync(TObject updated, Key key)
        {
            if (updated == null)
                return null;

            TObject existing = await _context.Set<TObject>().FindAsync(key);
            if (existing != null)
            {
                _context.Entry(existing).CurrentValues.SetValues(updated);
                await _context.SaveChangesAsync();
            }
            return existing;
        }

        public void Delete(TObject t)
        {
            _context.Set<TObject>().Remove(t);
            _context.SaveChanges();
        }

        public async Task<int> DeleteAsync(TObject t)
        {
            _context.Set<TObject>().Remove(t);
            return await _context.SaveChangesAsync();
        }

        public int Count()
        {
            return _context.Set<TObject>().Count();
        }

        public async Task<int> CountAsync()
        {
            return await _context.Set<TObject>().CountAsync();
        }
    }
}
