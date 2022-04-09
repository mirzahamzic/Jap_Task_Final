using AutoMapper;
using JapTask1.Core.Dtos.Request;
using JapTask1.Core.Dtos.Response;
using JapTask1.Core.Entities;
using JapTask1.Core.Interfaces;
using JapTask1.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JapTask1.Services
{
    public class RecipeIngredientService : IRecipeIngredientService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public RecipeIngredientService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<GetRecipeIngredientDto> Create(int recipeId, AddRecipeIngredientDto ingredient)
        {
            if (_context.RecipesIngredients.Any(i => i.RecipeId == recipeId && i.IngredientId == ingredient.IngredientId))
                throw new ArgumentNullException($"Ingredient is already in recipe.");

            var newIngredient = _mapper.Map<RecipeIngredient>(ingredient);

            newIngredient.RecipeId = recipeId;

            await _context.RecipesIngredients.AddAsync(newIngredient);
            await _context.SaveChangesAsync();

            var response = _mapper.Map<GetRecipeIngredientDto>(newIngredient);

            return response;

        }

        public async Task<GetRecipeIngredientDto> Update(int recipeId, UpdateRecipeIngredientDto ingredient)
        {
            var dbIngredient = await _context.RecipesIngredients
                    .FirstOrDefaultAsync(i => i.RecipeId == recipeId && i.Id == ingredient.Id);

            if (dbIngredient == null) { throw new ArgumentNullException(nameof(dbIngredient)); }

            var updatedIngredient = _mapper.Map<RecipeIngredient>(ingredient);

            updatedIngredient.RecipeId = recipeId;

            _context.Entry(dbIngredient).CurrentValues.SetValues(updatedIngredient);
            await _context.SaveChangesAsync();

            var response = _mapper.Map<GetRecipeIngredientDto>(updatedIngredient);

            return response;
        }

        public async Task<ServiceResponse<GetRecipeIngredientDto>> Delete(int id, int recipeId)
        {
            var dbIngredient = await _context.RecipesIngredients
                    .FirstOrDefaultAsync(i => i.RecipeId == recipeId && i.Id == id);

            if (dbIngredient == null) { throw new ArgumentNullException(nameof(dbIngredient)); }

            _context.RecipesIngredients.Remove(dbIngredient);
            await _context.SaveChangesAsync();

            return new ServiceResponse<GetRecipeIngredientDto>() { Message = "Deleted." };
        }

        public async Task<ServiceResponse<List<UpdateRecipeIngredientDto>>> Get(int recipeId)
        {
            var dbRecipeIngredients = await _context.RecipesIngredients
                    .Where(r => r.RecipeId == recipeId)
                    .Include(i => i.Ingredient)
                    .ToListAsync();

            var res = _mapper.Map<List<UpdateRecipeIngredientDto>>(dbRecipeIngredients);


            return new ServiceResponse<List<UpdateRecipeIngredientDto>>() { Data = res };
        }
    }
}
