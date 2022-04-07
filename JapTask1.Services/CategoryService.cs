using AutoMapper;
using JapTask1.Core.Dtos.Request;
using JapTask1.Core.Dtos.Response;
using JapTask1.Core.Entities;
using JapTask1.Core.Interfaces;
using JapTask1.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace JapTask1.Services.CategoryService
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public CategoryService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ServiceResponse<List<GetCategoryDto>>> Get([Optional] CategorySearch req)
        {
            var query = _context.Categories.AsQueryable();

            //req.Limit = (req.Page - 1) * req.PageSize;

            if (req.Name != null)
            {
                query = query
                    .Where(x => x.Name.ToLower().Contains(req.Name.ToLower()))
                    .AsQueryable();
            }

            if (req.Limit != null)
            {
                query = query
                    .Skip((int)req.Limit)
                    .Take((int)req.PageSize)
                    .AsQueryable();
            }

            var dbCategories = await query
                .Select(c => _mapper.Map<GetCategoryDto>(c))
                .ToListAsync();

            return new ServiceResponse<List<GetCategoryDto>>() { Data = dbCategories };
        }

        public async Task<ServiceResponse<GetCategoryDto>> GetById(int id)
        {
            var dbCategory = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);

            if (dbCategory == null) throw new ArgumentNullException(nameof(dbCategory));

            return new ServiceResponse<GetCategoryDto>()
            {
                Data = _mapper.Map<GetCategoryDto>(dbCategory)
            };
        }

        public async Task<ServiceResponse<GetCategoryDto>> Create(AddCategoryDto category)
        {
            if (_context.Categories.Any(c => c.Name == category.Name))
                throw new ArgumentNullException($"Category '{category.Name}' already exists.");

            var newCategory = _mapper.Map<Category>(category);

            await _context.Categories.AddAsync(newCategory);
            await _context.SaveChangesAsync();

            return new ServiceResponse<GetCategoryDto>()
            {
                Data = _mapper.Map<GetCategoryDto>(newCategory)
            };
        }

        public async Task<ServiceResponse<GetCategoryDto>> Update(AddCategoryDto category)
        {

            var dbCategory = await _context.Categories.FirstOrDefaultAsync(c => c.Id == category.Id);

            if (dbCategory == null) { throw new ArgumentNullException(nameof(dbCategory)); }

            dbCategory.Name = category.Name;

            await _context.SaveChangesAsync();

            return new ServiceResponse<GetCategoryDto>()
            {
                Data = _mapper.Map<GetCategoryDto>(dbCategory)
            };
        }

        public async Task<ServiceResponse<GetCategoryDto>> Delete(int id)
        {
            var dbCategory = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);

            if (dbCategory == null) { throw new ArgumentNullException(nameof(dbCategory)); }

            _context.Categories.Remove(dbCategory);

            _context.SaveChanges();

            return new ServiceResponse<GetCategoryDto>()
            {
                Message = "Deleted."
            };
        }
    }
}
