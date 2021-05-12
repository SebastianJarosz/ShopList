using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ShopList.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopList.Database
{
    public class ShopListDbContext : IdentityDbContext<User>
    {
        private readonly DbContextOptions _options;
        public ShopListDbContext(DbContextOptions options) : base(options)
        {
            _options = options;
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        }

        public DbSet<User> User { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<UsersLoginHistory> UsersLoginHistory { get; set; }
        public DbSet<UserAuthorisation> UserAuthorisation { get; set; }
    }
}