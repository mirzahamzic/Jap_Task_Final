import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";

import AddRecipe from "./components/recipes/AddRecipe";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import RecipesByCategory from "./components/recipes/RecipesByCategory";
import RecipeDetail from "./pages/RecipeDetail";
import Header from "./components/Header";
import Ingredient from "./pages/Ingredient";

import "./assets/css/bootstrap.min.css";
import IngredientForm from "./components/ingredients/IngredientForm";
import Category from "./pages/Category";
import CategoryForm from "./components/categories/CategoryForm";
import Recipe from "./pages/Recipe";
import RecipeForm from "./components/recipes/RecipeForm";

function App() {
  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes>
            {/* public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/ingredients" element={<Ingredient />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/recipes" element={<Recipe />} />
            <Route path="/recipes/:recipeId" element={<RecipeDetail />} />
            <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />

            {/* protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/addrecipe" element={<RecipeForm />} />
              <Route path="/editrecipe" element={<RecipeForm />} />
              <Route path="/addingredient" element={<IngredientForm />} />
              <Route path="/editingredient" element={<IngredientForm />} />
              <Route path="/addcategory" element={<CategoryForm />} />
              <Route path="/editcategory" element={<CategoryForm />} />
              <Route
                path="/recipes/category/:categoryId"
                element={<RecipesByCategory />}
              />
             
            </Route>

            {/* 404 route */}
            <Route
              path="*"
              element={
                <div className="py-5 text-center">
                  <h1 className="display-1 text-bold">404</h1>
                  <h6>Page not found!</h6>
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
