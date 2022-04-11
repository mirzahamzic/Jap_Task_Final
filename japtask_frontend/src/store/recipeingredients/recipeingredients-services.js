import fetchClient from "../../helpers/apiConfig";

// Get all ingredients in recipe
const getRecipeIngredients = async (id) => {
  const response = await fetchClient.get("/api/Recipe/" + id);
  return response.data;
};

// Update all ingredients in recipe
const updateRecipeIngredients = async (recIngData) => {
  const { data, recipeId, id } = recIngData;
  const response = await fetchClient.put("/api/Recipe/" + recipeId, data);
  return response.data;
};

// delete ingredient in recipe
const deleteRecipeIngredients = async (data) => {
  const { recipeId, id } = data;
  const response = await fetchClient.delete(`/api/Recipe/${recipeId}/${id}`);
  return response.data;
};

const recipeIngredientsService = {
  getRecipeIngredients,
  updateRecipeIngredients,
  deleteRecipeIngredients,
};

export default recipeIngredientsService;
