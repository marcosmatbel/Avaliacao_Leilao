using Leilao.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
namespace Leilao.Data
{
    public class AppDbContext : DbContext
    {
        /*
        public AppDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string mySqlConnection = Configuration.GetConnectionString("DefaultConnection");
            optionsBuilder.UseMySql(mySqlConnection,
                    ServerVersion.AutoDetect(mySqlConnection));
        }*/
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }


        public DbSet<Produto> Produtos { get; set; }

        public DbSet<Pessoa> Pessoas { get; set; }

        public DbSet<Lances> Lances { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Produto>()
                .Property(p => p.Foto)
                .HasColumnType("longblob");

            modelBuilder.Entity<Lances>()
           .HasOne(p => p.Pessoa)
           .WithMany(b => b.Lances);

            modelBuilder.Entity<Lances>()
          .HasOne(p => p.Produto)
          .WithMany(b => b.Lances);
        }
    }
}
