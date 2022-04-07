using JapTask1.Common.Enums;


namespace JapTask1.Core.Dtos.Response
{
    public class GetRecipeIngredientDto
    {
        public string Name { get; set; }
        public double Quantity { get; set; }
        public Units Unit { get; set; }
        public double Price { get; set; }
    }
}
