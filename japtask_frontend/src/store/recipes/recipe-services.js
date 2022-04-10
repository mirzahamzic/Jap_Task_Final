import axios from "axios";
import fetchClient from "../../helpers/apiConfig";

const BASE_URL = "https://localhost:5001";

// Get all recipes
const getAllRecipes = async (params) => {
  const config = {
    params: {
      page: params.page,
      pageSize: params.pageSize,
    },
  };
  const response = await fetchClient.get("/api/Recipes/", config);
  return response.data;
};

// Get recipe by Id
const getRecipeById = async (id) => {
  const response = await fetchClient.get("/api/Recipes/" + id);
  return response.data;
};

// Add recipe
const addRecipe = async (data) => {
  const response = await fetchClient.post("/api/Recipes/", data);
  return response.data;
};

// Update recipe
const updateRecipe = async (data) => {
  const response = await fetchClient.put("/api/Recipes/", data);
  return response.data;
};

// Delete recipe
const deleteRecipe = async (id) => {
  const response = await fetchClient.delete("/api/Recipes/" + id);
  return response.data;
};


const recipeService = {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
};

export default recipeService;