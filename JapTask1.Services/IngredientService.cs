using AutoMapper;
using JapTask1.Core.Dtos;
using JapTask1.Core.Dtos.Request;
using JapTask1.Core.Dtos.Response;
using JapTask1.Core.Entities;
using JapTask1.Core.Interfaces;
using JapTask1.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace JapTask1.Services.IngredientService
{
    public class IngredientService : IIngredientService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public IngredientService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<ServiceResponse<List<GetIngredientDto>>> Get([Optional] IngredientSearch req)
        {
            var query = Sort(req.SortBy, req.SortMethod).AsQueryable();

            if (req.Name != null)
            {
                query = query
                    .Where(x => x.Name.ToLower().Contains(req.Name.ToLower()))
                    .AsQueryable();
            }

            if (req.Measure != null)
            {
                query = query
                    .Where(x => x.PurchasedUnitOfMeasure == req.Measure)
                    .AsQueryable();
            };


            if (req.minRange != null && req.maxRange != null)
            {
                query = query
                   .Where(x => x.PurchasedQuantity >= req.minRange && x.PurchasedQuantity <= req.maxRange);
            }

            if (req.Limit != null)
            {
                query = query
                    .Skip((int)req.Limit)
                    .Take((int)req.PageSize)
                    .AsQueryable();
            }

            var dbIngredients = await query.Select(i => _mapper.Map<GetIngredientDto>(i)).ToListAsync();

            return new ServiceResponse<List<GetIngredientDto>>()
            {
                Data = dbIngredients
            };
        }

        public async Task<ServiceResponse<GetIngredientDto>> GetById(int id)
        {
            var dbIngredient = await _context.Ingredients.FirstOrDefaultAsync(c => c.Id == id);

            if (dbIngredient == null) throw new ArgumentNullException(nameof(dbIngredient));

            return new ServiceResponse<GetIngredientDto>()
            {
                Data = _mapper.Map<GetIngredientDto>(dbIngredient)
            };
        }

        public async Task<ServiceResponse<GetIngredientDto>> Create(AddIngredientDto ingredient)
        {
            if (_context.Ingredients.Any(i => i.Name == ingredient.Name))
                throw new ArgumentNullException($"Ingredient '{ingredient.Name}' already exists.");

            var newIngredient = _mapper.Map<Ingredient>(ingredient);

            await _context.Ingredients.AddAsync(newIngredient);
            await _context.SaveChangesAsync();

            return new ServiceResponse<GetIngredientDto>()
            {
                Data = _mapper.Map<GetIngredientDto>(newIngredient)
            };
        }

        public async Task<ServiceResponse<GetIngredientDto>> Update(AddIngredientDto ingredient)
        {
            var dbIngredient = await _context.Ingredients.FirstOrDefaultAsync(i => i.Id == ingredient.Id);

            if (dbIngredient == null) { throw new ArgumentNullException(nameof(dbIngredient)); }

            var updatedIngredient = _mapper.Map<Ingredient>(ingredient);

            _context.Entry(dbIngredient).CurrentValues.SetValues(updatedIngredient);
            await _context.SaveChangesAsync();

            return new ServiceResponse<GetIngredientDto>()
            {
                Data = _mapper.Map<GetIngredientDto>(updatedIngredient)
            };
        }

        public async Task<ServiceResponse<GetIngredientDto>> Delete(int id)
        {
            var dbIngredient = await _context.Ingredients.FirstOrDefaultAsync(i => i.Id == id);

            if (dbIngredient == null) { throw new ArgumentNullException(nameof(dbIngredient)); }

            _context.Ingredients.Remove(dbIngredient);
            _context.SaveChanges();

            return new ServiceResponse<GetIngredientDto>()
            {
                Message = "Deleted."
            };
        }


        //helper methods
        private IQueryable<Ingredient> Sort(string sortBy, string sortMod)
        {

            IQueryable<Ingredient> sortedIngredients = null;

            switch (sortBy)
            {
                case "Name":
                    if (sortMod == "desc")
                    {
                        sortedIngredients = _context.Ingredients.OrderByDescending(i => i.Name);
                    }
                    else if (sortMod == "asc")
                    {
                        sortedIngredients = _context.Ingredients.OrderBy(i => i.Name);
                    };
                    break;
                case "PurchasedPrice":
                    if (sortMod == "desc")
                    {
                        sortedIngredients = _context.Ingredients.OrderByDescending(i => i.PurchasedPrice);
                    }
                    else if (sortMod == "asc")
                    {
                        sortedIngredients = _context.Ingredients.OrderBy(i => i.PurchasedPrice);
                    };
                    break;
                case "PurchasedQuantity":
                    if (sortMod == "desc")
                    {
                        sortedIngredients = _context.Ingredients.OrderByDescending(i => i.PurchasedQuantity);
                    }
                    else if (sortMod == "asc")
                    {
                        sortedIngredients = _context.Ingredients.OrderBy(i => i.PurchasedQuantity);
                    };
                    break;
                case "PurchasedUnitOfMeasure":
                    if (sortMod == "desc")
                    {
                        sortedIngredients = _context.Ingredients.OrderByDescending(i => i.PurchasedUnitOfMeasure);
                    }
                    else if (sortMod == "asc")
                    {
                        sortedIngredients = _context.Ingredients.OrderBy(i => i.PurchasedUnitOfMeasure);
                    };
                    break;
                default:
                    sortedIngredients = _context.Ingredients;
                    break;

            }
            return sortedIngredients;
        }

    }
}
