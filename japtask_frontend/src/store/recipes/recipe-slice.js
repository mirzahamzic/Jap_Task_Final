import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import recipeService from "./recipe-services";

const initialState = {
  recipes: [],
  recipeIngredients: [],
  currentRecipe: {},
  status: "",
  message: "",
  isError: false,
  isSuccess: false,
};

// Get all recipes
export const getAllRecipes = createAsyncThunk(
  "recipes/getAllRecipes",
  async (params, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data;
      return await recipeService.getAllRecipes(params, token);
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

// Get recipe by Id
export const getRecipe = createAsyncThunk(
  "recipes/getRecipe",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data;
      return await recipeService.getRecipeById(id, token);
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

// Add recipe
export const addRecipe = createAsyncThunk(
  "ingredients/addRecipe",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data;
      // const token = "dummytokenfornow";
      return await recipeService.addRecipe(data, token);
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

// Update recipe
export const updateRecipe = createAsyncThunk(
  "ingredients/updateRecipe",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data;
      // const token = "dummytokenfornow";
      return await recipeService.updateRecipe(data, token);
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

// Delete recipe by Id
export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data;
      return await recipeService.deleteRecipe(id, token);
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

// Get all ingredients in recipe
export const getRecipeIngredients = createAsyncThunk(
  "recipes/getRecipeIngredients",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data;
      return await recipeService.recipeIngredients(id, token);
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

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetMessage: (state) => {
      state.status = "";
      state.message = "";
      state.isError = false;
      state.isSuccess = false;
    },
    deleteStateRecipe(state, action) {
      state.recipes = state.recipes.filter(
        (recipe) => recipe.id !== action.payload
      );
    },
  },
  extraReducers: {
    [getAllRecipes.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllRecipes.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.recipes = action.payload.data;
    },
    [getAllRecipes.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [getRecipe.pending]: (state) => {
      state.isLoading = true;
    },
    [getRecipe.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.currentRecipe = action.payload.data;
    },
    [getRecipe.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [addRecipe.pending]: (state) => {
      state.isLoading = true;
    },
    [addRecipe.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [addRecipe.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [updateRecipe.pending]: (state) => {
      state.isLoading = true;
    },
    [updateRecipe.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [updateRecipe.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [deleteRecipe.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteRecipe.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [deleteRecipe.rejected]: (state, action) => {
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

export const { reset, deleteStateRecipe, resetMessage } = recipeSlice.actions;
export default recipeSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import recipeService from "./recipe-services";

// const initialState = {
//   recipes: [],
//   currentRecipe: {},
//   recipesByRecipe: [],
//   status: "",
//   message: "",
//   searchTerm: "",
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   isLoadMore: true,
// };

// // Create new recipe
// export const createRecipe = createAsyncThunk(
//   "recipes/create",
//   async (recipeData, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.data;
//       return await recipeService.createRecipe(recipeData, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// // Update recipe
// export const updateRecipe = createAsyncThunk(
//   "recipes/updateRecipe",
//   async (recipeData, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       return await recipeService.updateRecipe(recipeData, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// // Get filtered recipes
// export const searchRecipes = createAsyncThunk(
//   "recipes/searchRecipes",
//   async (searchTerm, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.data;
//       return await recipeService.getFilteredRecipes(searchTerm, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// // Get all recipes by recipe
// export const getRecipesByRecipe = createAsyncThunk(
//   "recipes/getRecipesByRecipe",
//   async (recipeId, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.data;
//       return await recipeService.getRecipesByRecipeId(recipeId, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// // Get recipe by ID
// export const getRecipeById = createAsyncThunk(
//   "recipes/getRecipeById",
//   async (recipeId, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.data;
//       return await recipeService.getRecipeById(recipeId, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// export const recipeSlice = createSlice({
//   name: "recipe",
//   initialState,
//   reducers: {
//     reset: (state) => initialState,
//     search: (state, action) => {
//       state.searchTerm = action.payload;
//     },
//   },
//   extraReducers: {
//     [createRecipe.pending]: (state) => {
//       state.isLoading = true;
//     },
//     [createRecipe.fulfilled]: (state, action) => {
//       state.isLoading = false;
//       state.isSuccess = true;
//     },
//     [createRecipe.rejected]: (state, action) => {
//       state.isLoading = false;
//       state.isError = true;
//       state.message = action.payload;
//     },

//     [searchRecipes.pending]: (state) => {
//       state.isLoading = true;
//     },
//     [searchRecipes.fulfilled]: (state, action) => {
//       state.isLoading = false;
//       state.isSuccess = true;
//       state.recipesByRecipe = action.payload;
//     },
//     [searchRecipes.rejected]: (state, action) => {
//       state.isLoading = false;
//       state.isError = true;
//       state.message = action.payload;
//     },

//     [getRecipesByRecipe.pending]: (state) => {
//       state.isLoading = true;
//     },
//     [getRecipesByRecipe.fulfilled]: (state, action) => {
//       state.isLoading = false;
//       state.isSuccess = true;
//       state.recipesByRecipe = action.payload.data;
//     },
//     [getRecipesByRecipe.rejected]: (state, action) => {
//       state.isLoading = false;
//       state.isError = true;
//       state.message = action.payload;
//     },

//     [getRecipeById.pending]: (state) => {
//       state.isLoading = true;
//     },
//     [getRecipeById.fulfilled]: (state, action) => {
//       state.isLoading = false;
//       state.isSuccess = true;
//       state.currentRecipe = action.payload.data;
//     },
//     [getRecipeById.rejected]: (state, action) => {
//       state.isLoading = false;
//       state.isError = true;
//       state.message = action.payload;
//     },
//   },
// });

// export const { reset, search } = recipeSlice.actions;
// export default recipeSlice.reducer;
