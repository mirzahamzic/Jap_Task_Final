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

const RecipeIngredientList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { recipeIngredients, currentRecipe } = useSelector(
    (state) => state.recipe
  );

  const { id } = currentRecipe;

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th width="10%">#</th>
          <th width="30%">Ingredient name</th>
          <th width="30%">Quantity</th>
          <th width="10%">Unit</th>
          <th width="20%">Action</th>
        </tr>
      </thead>
      <tbody>
        {recipeIngredients.map((ingredient, i) => (
          <RecipeIngredientItem
            ingredient={ingredient}
            key={ingredient.id}
            index={i}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default RecipeIngredientList;


