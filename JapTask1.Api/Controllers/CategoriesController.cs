using JapTask1.Core.Dtos.Request;
using JapTask1.Core.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace JapTask1.Api.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CORS")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] CategorySearch req)
        {
            var response = await _categoryService.Get(req);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var response = await _categoryService.GetById(id);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddCategoryDto req)
        {
            var response = await _categoryService.Create(req);
            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] AddCategoryDto req)
        {
            var response = await _categoryService.Update(req);
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _categoryService.Delete(id);
            return Ok(response);
        }
    }
}
