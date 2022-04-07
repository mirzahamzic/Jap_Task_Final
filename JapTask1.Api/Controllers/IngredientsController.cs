using JapTask1.Core.Dtos.Request;
using JapTask1.Core.Dtos.Response;
using JapTask1.Core.Interfaces;
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
    public class IngredientsController : ControllerBase
    {
        private readonly IIngredientService _ingredientService;

        public IngredientsController(IIngredientService ingredientService)
        {
            _ingredientService = ingredientService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var response = await _ingredientService.Get();

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var response = await _ingredientService.GetById(id);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddIngredientDto req)
        {
            var response = await _ingredientService.Create(req);
            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] AddIngredientDto req)
        {
            var response = await _ingredientService.Update(req);
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _ingredientService.Delete(id);
            return Ok(response);
        }
    }
}
