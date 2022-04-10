import axios from "axios";
import fetchClient from "../../helpers/apiConfig";

const BASE_URL = "https://localhost:5001";

// Get all ingredients in recipe
const getRecipeIngredients = async (id) => {
  const response = await fetchClient.get("/api/Recipe/" + id);
  return response.data;
};

// Update all ingredients in recipe
const updateRecipeIngredients = async (recIngData, token) => {
  const { data, recipeId, id } = recIngData;
  const response = await fetchClient.put("/api/Recipe/" + recipeId, data);
  return response.data;
};

// delete ingredient in recipe
const deleteRecipeIngredients = async (data, token) => {
  const { recipeId, id } = data;
  const response = await axios.delete(`/api/Recipe/${recipeId}/${id}`);
  return response.data;
};

const recipeIngredientsService = {
  getRecipeIngredients,
  updateRecipeIngredients,
  deleteRecipeIngredients,
};

export default recipeIngredientsService;
