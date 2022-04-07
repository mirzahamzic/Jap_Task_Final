using JapTask1.Core.Dtos;
using JapTask1.Core.Dtos.Request;
using JapTask1.Core.Dtos.Response;
using JapTask1.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JapTask1.Core.Interfaces
{
    public interface IIngredientService
    {
        public Task<ServiceResponse<List<GetIngredientDto>>> Get();
        public Task<ServiceResponse<GetIngredientDto>> GetById(int Id);
        public Task<ServiceResponse<GetIngredientDto>> Create(AddIngredientDto req);
        public Task<ServiceResponse<GetIngredientDto>> Update(AddIngredientDto req);
        public Task<ServiceResponse<GetIngredientDto>> Delete(int Id);
    }
}
