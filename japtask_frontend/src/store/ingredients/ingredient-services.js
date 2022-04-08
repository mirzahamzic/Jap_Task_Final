import axios from "axios";

const BASE_URL = "https://localhost:5001";

// Get all ingredients
const getAllIngredients = async (params, token) => {
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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

  const response = await axios.get(BASE_URL + "/api/Ingredients/", config);

  return response.data;
};

// Get ingredient by Id
const getIngredientById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(BASE_URL + "/api/Ingredients/" + id, config);

  return response.data;
};

// Add ingredient
const addIngredient = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    BASE_URL + "/api/Ingredients/",
    data,
    config
  );

  return response.data;
};

// Update ingredient
const updateIngredient = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    BASE_URL + "/api/Ingredients/",
    data,
    config
  );
  return response.data;
};

// Delete ingredient
const deleteIngredient = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    BASE_URL + "/api/Ingredients/" + id,
    config
  );
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
