import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ingredientService from "./ingredient-services";

const initialState = {
  ingredients: [],
  currentIngredient: {},
  status: "",
  message: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoadMore: true,
};

// Get all ingredients
export const getAllIngredients = createAsyncThunk(
  "ingredients/getAll",
  async (_, thunkAPI) => {
    try {
      //   const token = thunkAPI.getState().auth.user.token;
      const token = "dummytokenfornow";
      return await ingredientService.getAllIngredients(token);
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

export const ingredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: {
    [getAllIngredients.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllIngredients.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.ingredients = action.payload.data;
    },
    [getAllIngredients.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});

export const { reset } = ingredientSlice.actions;
export default ingredientSlice.reducer;
