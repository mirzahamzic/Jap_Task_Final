using JapTask1.Core.Dtos;
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
    public interface ICategoryService
    {
        public Task<ServiceResponse<List<GetCategoryDto>>> Get(CategorySearch req);
        public Task<ServiceResponse<GetCategoryDto>> GetById(int Id);
        public Task<ServiceResponse<GetCategoryDto>> Create(AddCategoryDto req);
        public Task<ServiceResponse<GetCategoryDto>> Update(AddCategoryDto req);
        public Task<ServiceResponse<GetCategoryDto>> Delete(int Id);
    }
}
