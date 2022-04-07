using AutoMapper;
using JapTask1.Core.Dtos.Request;
using JapTask1.Core.Dtos.Response;
using JapTask1.Core.Entities;
using JapTask1.Core.Interfaces;
using JapTask1.Database;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;


namespace JapTask1.Services.RecipeService
{
    public class RecipeService : IRecipeService

    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;

        private readonly int userIdForTesting = 0; //set to 1 for testing, set to 0 for prod.

        public RecipeService(AppDbContext context, IMapper mapper, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _mapper = mapper;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }

        //getting user id from token
        //private int GetUserId() => int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
        private int GetUserId()
        {
            if (userIdForTesting == 0)
            {
                return int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
            }
            else
            {
                return userIdForTesting;
            }
        }

        public async Task<ServiceResponse<AddRecipeDto>> Create(AddRecipeDto recipe)
        {

            if (recipe.AddRecipeIngredientDto.Count == 0)
            {
                throw new ArgumentException("Recipe needs at least one ingredient.");
            }

            if (recipe.AddRecipeIngredientDto.GroupBy(x => x.IngredientId).Any(x => x.Count() > 1))
            {
                throw new ArgumentException("Can not add same ingredient");
            }

            var user = _context.Users.FirstOrDefault(u => u.Id == GetUserId());

            var newRecipe = new Recipe()
            {
                Name = recipe.Name,
                Description = recipe.Description,
                CategoryId = recipe.CategoryId,
                CreatedAt = DateTime.Now,
                UserId = user != null ? user.Id : 1,
            };

            await _context.Recipes.AddAsync(newRecipe);
            await _context.SaveChangesAsync();

            var ingredientsToSave = new List<RecipeIngredient>();

            foreach (var ingredient in recipe.AddRecipeIngredientDto)
            {
                ingredientsToSave.Add(new RecipeIngredient()
                {
                    RecipeId = newRecipe.Id,
                    IngredientId = ingredient.IngredientId,
                    Unit = ingredient.Unit,
                    Quantity = ingredient.Quantity,
                });
            }
            await _context.RecipesIngredients.AddRangeAsync(ingredientsToSave);
            await _context.SaveChangesAsync();

            return new ServiceResponse<AddRecipeDto>()
            {
                Data = recipe,
            };
        }

        public async Task<ServiceResponse<List<GetRecipeDto>>> Get([Optional] BaseSearch req)
        {
            var query = _context.Recipes
                    .Include(r => r.Category)
                    .Include(r => r.RecipesIngredients)
                    .ThenInclude(i => i.Ingredient)
                    .Where(r => r.User.Id == GetUserId())
                    .AsQueryable();

            if (req.Limit != null)
            {
                query = query
                    .Skip((int)req.Limit)
                    .Take((int)req.PageSize)
                    .AsQueryable();
            }

            var dbRecipes = await query
                    .Select(r => _mapper.Map<GetRecipeDto>(r))
                    .ToListAsync();

            return new ServiceResponse<List<GetRecipeDto>>()
            {
                Data = dbRecipes
            };
        }

        public async Task<ServiceResponse<List<GetRecipeDto>>> GetByCategory(int categoryId, [Optional] BaseSearch req)
        {
            var query = _context.Recipes
                     .Include(r => r.Category)
                     .Include(r => r.RecipesIngredients)
                     .ThenInclude(i => i.Ingredient)
                     .Where(r => r.CategoryId == categoryId && r.User.Id == GetUserId())
                     .AsQueryable();

            if (req.Limit != null)
            {
                query = query
                    .Skip((int)req.Limit)
                    .Take((int)req.PageSize)
                    .AsQueryable();
            }

            var dbRecipes = await query
                    .Select(r => _mapper.Map<GetRecipeDto>(r))
                    .ToListAsync();

            return new ServiceResponse<List<GetRecipeDto>>()
            {
                Data = dbRecipes
            };
        }

        public async Task<ServiceResponse<GetRecipeDto>> GetById(int recipeId)
        {
            var dbRecipes = await _context.Recipes
                .Include(r => r.Category)
                .Include(r => r.RecipesIngredients)
                .ThenInclude(i => i.Ingredient)
                .FirstOrDefaultAsync(r => r.Id == recipeId && r.UserId == GetUserId());

            if (dbRecipes == null)
            {
                throw new ArgumentException(nameof(dbRecipes));
            }

            return new ServiceResponse<GetRecipeDto>()
            {
                Data = _mapper.Map<GetRecipeDto>(dbRecipes)
            };
        }

        public async Task<ServiceResponse<List<GetRecipeDto>>> Search([Optional] RecipeSearch req)
        {
            var query = _context.Recipes
                 .Include(r => r.Category)
                 .Include(r => r.RecipesIngredients)
                 .ThenInclude(i => i.Ingredient)
                 .Where(r => (r.Name.ToLower().Contains(req.SearchTerm) || r.Description.ToLower().Contains(req.SearchTerm)) && r.UserId == GetUserId())
                 .AsQueryable();

            if (req.Limit != null)
            {
                query = query
                    .Skip((int)req.Limit)
                    .Take((int)req.PageSize)
                    .AsQueryable();
            }

            var dbRecipes = await query
                     .Select(recipe => _mapper.Map<GetRecipeDto>(recipe))
                     .ToListAsync();

            return new ServiceResponse<List<GetRecipeDto>>()
            {
                Data = dbRecipes
            };
        }

        public async Task<ServiceResponse<GetRecipeDto>> Update(UpdateRecipeDto recipe)
        {
            var dbRecipe = await _context.Recipes.FirstOrDefaultAsync(r => r.Id == recipe.Id && r.UserId == GetUserId());

            if (dbRecipe == null)
            {
                throw new ArgumentException(nameof(dbRecipe));
            }

            var updatedRecipe = _mapper.Map<Recipe>(recipe);

            updatedRecipe.UserId = GetUserId();

            _context.Entry(dbRecipe).CurrentValues.SetValues(updatedRecipe);

            await _context.SaveChangesAsync();

            return new ServiceResponse<GetRecipeDto>()
            {
                //Data = _mapper.Map<GetRecipeDto>(updatedRecipe)
                Message = "Recipe updated successfully."
            };
        }

        public async Task<ServiceResponse<GetRecipeDto>> Delete(int id)
        {
            var dbRecipe = await _context.Ingredients.FirstOrDefaultAsync(i => i.Id == id);

            if (dbRecipe == null) { throw new ArgumentNullException(nameof(dbRecipe)); }

            _context.Ingredients.Remove(dbRecipe);

            _context.SaveChanges();

            return new ServiceResponse<GetRecipeDto>()
            {
                Message = "Deleted."
            };
        }
    }
}



