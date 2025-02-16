namespace SalesBackend.Models
{
    public class ReceiptResponse
    {
        public List<ReceiptItemResponse> Items { get; set; }
        public decimal TotalTax { get; set; }
        public decimal TotalAmount { get; set; }
    }

    public class ReceiptItemResponse
    {
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
    }
}