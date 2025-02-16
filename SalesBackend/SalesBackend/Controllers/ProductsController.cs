using Microsoft.AspNetCore.Mvc;
using SalesBackend.Data;
using SalesBackend.Models;
using SalesBackend.Services;
using System.Collections.Generic;
using System.Linq;

namespace SalesBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly SalesTaxesContext _context;

        public ProductsController(SalesTaxesContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetProducts()
        {
            return _context.Products.ToList();
        }
        [HttpPost]
        public ActionResult<Product> CreateProduct([FromBody] Product product)
        {
            // Validazioni
            if (product == null)
            {
                return BadRequest("Product data is null.");
            }

            if (string.IsNullOrEmpty(product.Name))
            {
                return BadRequest("Product name is required.");
            }

            if (product.Price <= 0)
            {
                return BadRequest("Product price must be greater than 0.");
            }

            // Aggiungi il prodotto al database
            _context.Products.Add(product);
            _context.SaveChanges();

            // Restituisci il prodotto creato con l'ID generato
            return CreatedAtAction(nameof(GetProducts), new { id = product.Id }, product);
        }
    }
}