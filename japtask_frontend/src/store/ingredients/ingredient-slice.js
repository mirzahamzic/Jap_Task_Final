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
  pageSizeRedux: 5,
  minRangeRedux: "",
  maxRangeRedux: "",
  unitsRedux: "",
  nameRedux: "",
};

// Get all ingredients
export const getAllIngredients = createAsyncThunk(
  "ingredients/getAllIngredients",
  async (params, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data;
      // const token = "dummytokenfornow";
      return await ingredientService.getAllIngredients(params, token);
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

// Get ingredient by id
export const getIngredient = createAsyncThunk(
  "ingredients/getIngredient",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data;
      // const token = "dummytokenfornow";
      return await ingredientService.getIngredientById(id, token);
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

// Add ingredient
export const addIngredient = createAsyncThunk(
  "ingredients/addIngredient",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data;
      // const token = "dummytokenfornow";
      return await ingredientService.addIngredient(data, token);
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

// Update ingredient
export const updateIngredient = createAsyncThunk(
  "ingredients/updateIngredient",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data;
      // const token = "dummytokenfornow";
      return await ingredientService.updateIngredient(data, token);
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

// Delete ingredient
export const deleteIngredient = createAsyncThunk(
  "ingredients/updateIngredient",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data;
      // const token = "dummytokenfornow";
      return await ingredientService.deleteIngredient(id, token);
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
    setPageSizeRedux: (state, action) => {
      console.log(action.payload);
      state.pageSizeRedux = action.payload;
    },
    setFilterParams: (state, action) => {
      console.log(action.payload);
      state.minRangeRedux = action.payload.min;
      state.maxRangeRedux = action.payload.max;
      state.unitsRedux = action.payload.unit;
      state.nameRedux = action.payload.name;
    },
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
    [getIngredient.pending]: (state) => {
      state.isLoading = true;
    },
    [getIngredient.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.currentIngredient = action.payload.data;
    },
    [getIngredient.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [addIngredient.pending]: (state) => {
      state.isLoading = true;
    },
    [addIngredient.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [addIngredient.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [updateIngredient.pending]: (state) => {
      state.isLoading = true;
    },
    [updateIngredient.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [updateIngredient.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});

export const { reset, setPageSizeRedux, setFilterParams } =
  ingredientSlice.actions;
export default ingredientSlice.reducer;
