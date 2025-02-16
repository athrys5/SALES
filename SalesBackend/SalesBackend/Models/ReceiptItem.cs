﻿namespace SalesBackend.Models
{
    public class ReceiptItem
    {
        public int Id { get; set; }
        public int ReceiptId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
    }
}