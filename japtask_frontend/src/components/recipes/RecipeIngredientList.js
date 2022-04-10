import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../../store/categories/category-slice";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import Paginator from "../shared/Paginator";
import Spinner from "../shared/Spinner/Spinner";
import RecipeIngredientItem from "./RecipeIngredientItem";
import { addIngredientToRecipe } from "../../store/recipeingredients/recipeingredients-slice";

const RecipeIngredientList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { recipeIngredients } = useSelector((state) => state.recipeIngredient);

  const handleAddClick = () => {
    dispatch(
      addIngredientToRecipe({ ingredientId: "", quantity: 0, unit: "" })
    );
  };

  return (
    <>
      {recipeIngredients.map((ingredient, i) => (
        <>
          <RecipeIngredientItem
            recipeIngredient={ingredient}
            key={ingredient.id}
            index={i}
          />
          {recipeIngredients.length - 1 === i && (
            <Button size="sm" variant="success" onClick={handleAddClick}>
              Add
            </Button>
          )}
        </>
      ))}
    </>
  );
};

export default RecipeIngredientList;
