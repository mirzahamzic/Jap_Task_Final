using JapTask1.Core.Dtos.Request;
using JapTask1.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace JapTask1.Api.Controllers
{
    [Route("api/recipe/{recipeId}")]
    [ApiController]
    public class RecipeIngredientController : ControllerBase
    {
        private readonly IRecipeIngredientService _recipeIngredientService;

        public RecipeIngredientController(IRecipeIngredientService recipeIngredientService)
        {
            _recipeIngredientService = recipeIngredientService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(int recipeId, [FromBody] AddRecipeIngredientDto req)
        {
            var response = await _recipeIngredientService.Create(recipeId, req);
            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> Update(int recipeId, [FromBody] UpdateRecipeIngredientDto req)
        {
            var response = await _recipeIngredientService.Update(recipeId, req);
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id, int recipeId)
        {
            var response = await _recipeIngredientService.Delete(id, recipeId);
            return Ok(response);
        }
    }
}
