import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./category-services";

const initialState = {
  categories: [],
  currentCategory: {},
  status: "",
  message: "",
  isError: false,
  isSuccess: false,
};

// Get all categories
export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async (params, thunkAPI) => {
    console.log(params);
    try {
      // const token = thunkAPI.getState().auth.user.data;
      return await categoryService.getAllCategories(params);
    } catch (error) {
      console.log(error);

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

// Get category by Id
export const getCategory = createAsyncThunk(
  "categories/getCategory",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data;
      return await categoryService.getCategoryById(id, token);
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

// Add category
export const addCategory = createAsyncThunk(
  "ingredients/addCategory",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data;
      // const token = "dummytokenfornow";
      return await categoryService.addCategory(data, token);
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

// Update category
export const updateCategory = createAsyncThunk(
  "ingredients/updateCategory",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data;
      // const token = "dummytokenfornow";
      return await categoryService.updateCategory(data, token);
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

// Delete category by Id
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data;
      return await categoryService.deleteCategory(id, token);
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
    deleteStateCategory(state, action) {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    resetCurrent(state) {
      state.currentCategory = {};
    },
  },
  extraReducers: {
    [getAllCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.categories = action.payload.data;
    },
    [getAllCategories.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [getCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [getCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.currentCategory = action.payload.data;
    },
    [getCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [addCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [addCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [addCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [updateCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [updateCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [updateCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [deleteCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [deleteCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});

export const { reset, deleteStateCategory,resetCurrent } = categorySlice.actions;
export default categorySlice.reducer;
