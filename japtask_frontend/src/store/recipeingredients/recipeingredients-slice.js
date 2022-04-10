import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import recipeIngredientService from "./recipeingredients-services";

const initialState = {
  recipeIngredients: [],
  status: "",
  message: "",
  isError: false,
  isSuccess: false,
};

// Get all ingredients in recipe
export const getRecipeIngredients = createAsyncThunk(
  "recipes/getRecipeIngredients",
  async (id, thunkAPI) => {
    try {
      return await recipeIngredientService.getRecipeIngredients(id);
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

// update ingredients in recipe
export const updateRecipeIngredients = createAsyncThunk(
  "recipes/updateRecipeIngredients",
  async (data, thunkAPI) => {
    try {
      return await recipeIngredientService.updateRecipeIngredients(data);
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

// delete ingredients in recipe
export const deleteRecipeIngredients = createAsyncThunk(
  "recipes/deleteRecipeIngredients",
  async (data, thunkAPI) => {
    try {
      return await recipeIngredientService.deleteRecipeIngredients(data);
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

export const recipeIngredientSlice = createSlice({
  name: "recipeIngredientSlice",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetMessage: (state) => {
      state.status = "";
      state.message = "";
      state.isError = false;
      state.isSuccess = false;
    },
    resetCurrent(state) {
      state.currentRecipe = {};
    },

    addIngredientToRecipe(state, action) {
      state.recipeIngredients.push(action.payload);
      console.log(state.recipeIngredients);
    },

    deleteStateRecipeIngredient(state, action) {
      console.log(action.payload);
      state.recipeIngredients = state.recipeIngredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
  },
  extraReducers: {
    [updateRecipeIngredients.pending]: (state) => {
      state.isLoading = true;
    },
    [updateRecipeIngredients.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [updateRecipeIngredients.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [deleteRecipeIngredients.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteRecipeIngredients.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [deleteRecipeIngredients.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [getRecipeIngredients.pending]: (state) => {
      state.isLoading = true;
    },
    [getRecipeIngredients.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.recipeIngredients = action.payload.data;
    },
    [getRecipeIngredients.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});

export const {
  reset,
  deleteStateRecipeIngredient,
  resetMessage,
  resetCurrent,
  addIngredientToRecipe,
} = recipeIngredientSlice.actions;
export default recipeIngredientSlice.reducer;
