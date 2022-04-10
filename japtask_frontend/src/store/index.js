import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./recipes/recipe-slice";
import ingredientReducer from "./ingredients/ingredient-slice";
import categoryReducer from "./categories/category-slice";
import authReducer from "./auth/auth-slice";
import pagingReducer from "./paging/page-slice";
import recipeIngredientReducer from "./recipeingredients/recipeingredients-slice";

export const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    ingredient: ingredientReducer,
    category: categoryReducer,
    auth: authReducer,
    paging: pagingReducer,
    recipeIngredient: recipeIngredientReducer,
  },
});
