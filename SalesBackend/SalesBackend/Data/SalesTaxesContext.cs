using Microsoft.EntityFrameworkCore;
using SalesBackend.Models;

namespace SalesBackend.Data
{
    public class SalesTaxesContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Receipt> Receipts { get; set; }
        public DbSet<ReceiptItem> ReceiptItems { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=localhost;Database=SalesTaxes;Trusted_Connection=True;Encrypt=False;");
        }
    }
}