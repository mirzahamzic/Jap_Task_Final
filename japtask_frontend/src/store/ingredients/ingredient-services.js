import fetchClient from "../../helpers/apiConfig";

// Get all ingredients
const getAllIngredients = async (params, token) => {
  const config = {
    params: {
      page: !params.page ? "1" : params.page,
      pageSize: !params.pageSize ? "5" : params.pageSize,
      sortBy: params.sortBy,
      sortMethod: params.sort,
      name: params.name,
      maxRange: params.max,
      minRange: params.min,
      measure: params.unit,
    },
  };
  const response = await fetchClient.get("/api/Ingredients/", config);
  return response.data;
};

// Get ingredient by Id
const getIngredientById = async (id) => {
  const response = await fetchClient.get("/api/Ingredients/" + id);
  return response.data;
};

// Add ingredient
const addIngredient = async (data) => {
  const response = await fetchClient.post("/api/Ingredients/", data);
  return response.data;
};

// Update ingredient
const updateIngredient = async (data) => {
  const response = await fetchClient.put("/api/Ingredients/", data);
  return response.data;
};

// Delete ingredient
const deleteIngredient = async (id, token) => {
  const response = await fetchClient.delete("/api/Ingredients/" + id);
  return response.data;
};

const ingredientService = {
  getAllIngredients,
  getIngredientById,
  addIngredient,
  updateIngredient,
  deleteIngredient,
};

export default ingredientService;
