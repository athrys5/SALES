namespace SalesBackend.Models
{
    public class Receipt
    {
        public int Id { get; set; }
        public decimal TotalTax { get; set; }
        public decimal TotalAmount { get; set; }
    }
}