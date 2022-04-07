using JapTask1.Common.Enums;


namespace JapTask1.Core.Dtos.Request
{
    public class AddIngredientDto : IngredientDto
    {
        public string Name { get; set; }
        public double PurchasedQuantity { get; set; }
        public double PurchasedPrice { get; set; }
        public Units PurchasedUnitOfMeasure { get; set; }
    }
}
