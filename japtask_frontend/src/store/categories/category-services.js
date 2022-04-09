import axios from "axios";

const BASE_URL = "https://localhost:5001";

// Get all categories
const getAllCategories = async (params, token) => {
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

  const response = await axios.get(BASE_URL + "/api/Categories/", config);

  return response.data;
};

// Get category by Id
const getCategoryById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(BASE_URL + "/api/Categories/" + id, config);

  return response.data;
};

// Add category
const addCategory = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    BASE_URL + "/api/Categories/",
    data,
    config
  );

  return response.data;
};

// Update category
const updateCategory = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(BASE_URL + "/api/Categories/", data, config);
  return response.data;
};

// Delete category
const deleteCategory = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    BASE_URL + "/api/Categories/" + id,
    config
  );
  return response.data;
};

const ingredientService = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
};

export default ingredientService;
