using JapTask1.Core.Dtos.Request;
using JapTask1.Core.Dtos.Response;
using JapTask1.Core.Entities;
using JapTask1.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JapTask1.Api.Controllers
{

    [Route("api/[controller]")]
    [EnableCors("CORS")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly IRecipeService _recipeService;

        public RecipesController(IRecipeService recipeService)
        {
            _recipeService = recipeService;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] AddRecipeDto newRecipe)
        {
            var response = await _recipeService.Create(newRecipe);

            return Ok(response);
        }

        [HttpGet]
        public async Task<ActionResult> Get([FromQuery] BaseSearch req)
        {
            return Ok(await _recipeService.Get(req));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var response = await _recipeService.GetById(id);

            return Ok(response);
        }

        [HttpGet, Route("searchRecipe")]
        public async Task<ActionResult> Search([FromQuery] RecipeSearch req)
        {
            return Ok(await _recipeService.Search(req));
        }

        [HttpGet, Route("getByCategory/{categoryId}")]
        public async Task<ActionResult<ServiceResponse<List<GetRecipeDto>>>> GetByCategory(int categoryId, [FromQuery] BaseSearch req)

        {
            return Ok(await _recipeService.GetByCategory(categoryId, req));
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> Update([FromBody] UpdateRecipeDto newRecipe)
        {
            var response = await _recipeService.Update(newRecipe);
            return Ok(response);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _recipeService.Delete(id);
            return Ok(response);
        }
    }
}
