using JapTask1.Common.Enums;


namespace JapTask1.Core.Dtos.Request
{
    public class AddRecipeIngredientDto
    {
        public int IngredientId { get; set; }
        public double Quantity { get; set; }
        public Units Unit { get; set; }
    }
}
