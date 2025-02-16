using Microsoft.EntityFrameworkCore;
using SalesBackend.Models;

namespace SalesBackend.Data
{
    public class SalesTaxesContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public SalesTaxesContext(DbContextOptions<SalesTaxesContext> options, IConfiguration configuration)
            : base(options)
        {
            _configuration = configuration;
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Receipt> Receipts { get; set; }
        public DbSet<ReceiptItem> ReceiptItems { get; set; }

    }
}
