import axios from "axios";

const BASE_URL = "https://localhost:5001";

// Get all ingredients in recipe
const getRecipeIngredients = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(BASE_URL + "/api/Recipe/" + id, config);

  return response.data;
};

// Update all ingredients in recipe
const updateRecipeIngredients = async (recIngData, token) => {
  const { data, recipeId, id } = recIngData;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    BASE_URL + "/api/Recipe/" + recipeId,
    data,
    config
  );
  return response.data;
};

// delete ingredient in recipe
const deleteRecipeIngredients = async (data, token) => {
  const { recipeId, id } = data;
  console.log(data);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    BASE_URL + `/api/Recipe/${recipeId}/${id}`,
    config
  );
  return response.data;
};

const recipeIngredientsService = {
  getRecipeIngredients,
  updateRecipeIngredients,
  deleteRecipeIngredients,
};

export default recipeIngredientsService;
