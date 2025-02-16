using Microsoft.AspNetCore.Mvc;
using SalesBackend.Data;
using SalesBackend.Models;
using SalesBackend.Services;
using System.Collections.Generic;
using System.Linq;
namespace SalesTaxes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceiptsController : ControllerBase
    {
        private readonly SalesTaxesContext _context;
        private readonly TaxCalculator _taxCalculator;

        public ReceiptsController(SalesTaxesContext context, TaxCalculator taxCalculator)
        {
            _context = context;
            _taxCalculator = taxCalculator;
        }

        [HttpGet]
        public ActionResult<List<ReceiptResponse>> GetAllReceipts()
        {
            var receipts = _context.Receipts.ToList();

            var responseList = receipts.Select(receipt => new ReceiptResponse
            {
                Items = _context.ReceiptItems
                    .Where(ri => ri.ReceiptId == receipt.Id)
                    .Join(_context.Products,
                          ri => ri.ProductId,
                          p => p.Id,
                          (ri, p) => new ReceiptItemResponse
                          {
                              ProductName = p.Name,
                              Quantity = ri.Quantity,
                              TotalPrice = ri.TotalPrice
                          })
                    .ToList(),
                TotalTax = receipt.TotalTax,
                TotalAmount = receipt.TotalAmount
            }).ToList();

            return Ok(responseList);
        }


        [HttpPost]
        public ActionResult<ReceiptResponse> GenerateReceipt([FromBody] List<CartItem> cartItems)
        {
            decimal totalTax = 0;
            decimal totalAmount = 0;
            var receiptItems = new List<ReceiptItemResponse>();

            // Crea una nuova ricevuta
            var receipt = new Receipt
            {
                TotalTax = totalTax,
                TotalAmount = totalAmount
            };
            _context.Receipts.Add(receipt);
            _context.SaveChanges(); // Salva la ricevuta per ottenere l'ID

            foreach (var cartItem in cartItems)
            {
                var product = _context.Products.FirstOrDefault(p => p.Id == cartItem.ProductId);
                if (product == null)
                {
                    return NotFound($"Product with ID {cartItem.ProductId} not found.");
                }

                // Calcola le tasse per il prodotto
                decimal tax = _taxCalculator.CalculateTax(product);
                decimal totalPrice = (product.Price + tax) * cartItem.Quantity;

                // Aggiorna i totali della ricevuta
                totalTax += tax * cartItem.Quantity;
                totalAmount += totalPrice;

                // Aggiungi l'elemento alla ricevuta
                _context.ReceiptItems.Add(new ReceiptItem
                {
                    ReceiptId = receipt.Id, // Collega l'elemento alla ricevuta
                    ProductId = product.Id,
                    Quantity = cartItem.Quantity,
                    TotalPrice = totalPrice
                });

                // Aggiungi l'elemento alla risposta
                receiptItems.Add(new ReceiptItemResponse
                {
                    ProductName = product.Name,
                    Quantity = cartItem.Quantity,
                    TotalPrice = totalPrice
                });
            }

            // Aggiorna i totali della ricevuta
            receipt.TotalTax = totalTax;
            receipt.TotalAmount = totalAmount;
            _context.SaveChanges(); // Salva gli elementi della ricevuta e aggiorna i totali

            return Ok(new ReceiptResponse
            {
                Items = receiptItems,
                TotalTax = totalTax,
                TotalAmount = totalAmount
            });
        }
    }
}