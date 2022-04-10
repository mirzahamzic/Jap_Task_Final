import fetchClient from "../../helpers/apiConfig";

// Get all categories
const getAllCategories = async (params) => {
  const response = await fetchClient.get("/api/Categories/", params);
  return response.data;
};

// Get category by Id
const getCategoryById = async (id) => {
  const response = await fetchClient.get("/api/Categories/" + id);
  return response.data;
};

// Add category
const addCategory = async (data) => {
  const response = await fetchClient.post("/api/Categories/", data);
  return response.data;
};

// Update category
const updateCategory = async (data, token) => {
  const response = await fetchClient.put("/api/Categories/", data);
  return response.data;
};

// Delete category
const deleteCategory = async (id, token) => {
  const response = await await fetchClient.delete("/api/Categories/" + id);
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
