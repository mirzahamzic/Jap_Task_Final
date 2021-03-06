using JapTask1.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JapTask1.Core.Dtos.Request
{
    public class UpdateRecipeIngredientDto
    {
        public int? Id { get; set; }
        public int IngredientId { get; set; }
        public string Name { get; set; }
        public double Quantity { get; set; }
        public Units Unit { get; set; }
    }
}
