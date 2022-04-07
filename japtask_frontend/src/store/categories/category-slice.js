import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./category-services";

const initialState = {
  categories: [],
  categoriesInMenu: [],
  currentCategory: {},
  status: "",
  message: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoadMore: true,
};

// Get all categories
export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data;
      return await categoryService.getAllCategories(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all categories
export const getAllCategoriesNoLoadMore = createAsyncThunk(
  "categories/getAllCategoriesNoLoadMore",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data;
      return await categoryService.getAllCategoriesNoLoadMore(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: {
    [getAllCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.categories = action.payload.data
    },
    [getAllCategories.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [getAllCategoriesNoLoadMore.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllCategoriesNoLoadMore.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.categoriesInMenu = action.payload;
    },
    [getAllCategoriesNoLoadMore.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
