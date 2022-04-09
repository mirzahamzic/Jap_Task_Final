import axios from "axios";

const BASE_URL = "https://localhost:5001";

// Get all recipes
const getAllRecipes = async (params, token) => {
  console.log(params);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: params.page,
      pageSize: params.pageSize,
    },
  };

  const response = await axios.get(BASE_URL + "/api/Recipes/", config);

  return response.data;
};

// Get recipe by Id
const getRecipeById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(BASE_URL + "/api/Recipes/" + id, config);

  return response.data;
};

// Add recipe
const addRecipe = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(BASE_URL + "/api/Recipes/", data, config);

  return response.data;
};

// Update recipe
const updateRecipe = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(BASE_URL + "/api/Recipes/", data, config);
  return response.data;
};

// Delete recipe
const deleteRecipe = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(BASE_URL + "/api/Recipes/" + id, config);
  return response.data;
};

// Get all ingredients in recipe
const recipeIngredients = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(BASE_URL + "/api/Recipe/" + id, config);

  return response.data;
};

const ingredientService = {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  recipeIngredients,
};

export default ingredientService;

// import axios from "axios";

// const API_URL = "/api/recipes/";

// // Create new recipe
// const createRecipe = async (recipeData, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const response = await axios.post(
//     "https://localhost:5001/api/Recipes/add-recipe-ingredient",
//     recipeData,
//     config
//   );

//   return response.data;
// };

// // Update recipe
// const updateRecipe = async (recipeData, token) => {
//   const { recipeId, text } = recipeData;
//   console.log(text);
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await axios.put(API_URL + recipeId, { text }, config);
//   return response.data;
// };

// // Get filtered recipes
// const getFilteredRecipes = async (searchTerm, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const response = await axios.get(
//     "https://localhost:5001/api/Recipes/get-recipes-by-search-term/" +
//       searchTerm,
//     config
//   );

//   return response.data;
// };

// // Get recipe by recipe id
// const getRecipesByRecipeId = async (recipeId, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     params: {
//       pageSize: 5,
//       page: 1,
//     },
//   };

//   const response = await axios.get(
//     "https://localhost:5001/api/Recipes/getByRecipe/" + recipeId,
//     config
//   );

//   return response.data;
// };

// // Get recipe by id
// const getRecipeById = async (recipeId, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await axios.get(
//     "https://localhost:5001/api/Recipes/" + recipeId,
//     config
//   );
//   return response.data;
// };

// // Remove user recipe
// const removeRecipe = async (recipeId, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await axios.delete(API_URL + recipeId, config);
//   return response.data;
// };

// const recipeService = {
//   createRecipe,
//   getFilteredRecipes,
//   getRecipesByRecipeId,
//   getRecipeById,
//   removeRecipe,
// };

// export default recipeService;
