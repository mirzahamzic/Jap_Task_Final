using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JapTask1.Core.Dtos.Request
{
    public class UpdateRecipeDto : RecipeDto
    {
        public int Id { get; set; }
    }
}
