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
        Task<ServiceResponse<List<GetIngredientDto>>> Get(IngredientSearch req);
        Task<ServiceResponse<GetIngredientDto>> GetById(int Id);
        Task<ServiceResponse<GetIngredientDto>> Create(AddIngredientDto req);
        Task<ServiceResponse<GetIngredientDto>> Update(AddIngredientDto req);
        Task<ServiceResponse<GetIngredientDto>> Delete(int Id);
    }
}
