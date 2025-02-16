using SalesBackend.Models;

namespace SalesBackend.Services
{
    public class TaxCalculator
    {
        // Calcola le tasse per un singolo prodotto
        public decimal CalculateTax(Product product)
        {
            decimal tax = 0;

            if (!IsExempt(product.Category))
            {
                tax += product.Price * 0.10m;
            }

            // Tassa aggiuntiva del 5% per i prodotti importati
            if (product.IsImported)
            {
                tax += product.Price * 0.05m;
            }

            // Arrotonda la tassa al multiplo di 0.05 più vicino
            tax = Math.Ceiling(tax / 0.05m) * 0.05m;

            return tax;
        }

        // Verifica se un prodotto è esente dalla tassa di base
        private bool IsExempt(string category)
        {
            return category.ToLower() == "book" ||
                   category.ToLower() == "food" ||
                   category.ToLower() == "medical";
        }
    }
}