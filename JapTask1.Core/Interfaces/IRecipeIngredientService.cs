using JapTask1.Core.Dtos.Request;
using JapTask1.Core.Dtos.Response;
using JapTask1.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JapTask1.Core.Interfaces
{
    public interface IRecipeIngredientService
    {
        Task<GetRecipeIngredientDto> Create(int recipeId, AddRecipeIngredientDto ingredient);
        Task<GetRecipeIngredientDto> Update(int recipeId, UpdateRecipeIngredientDto ingredient);
        Task<ServiceResponse<GetRecipeIngredientDto>> Delete(int id, int recipeId);
    }
}
