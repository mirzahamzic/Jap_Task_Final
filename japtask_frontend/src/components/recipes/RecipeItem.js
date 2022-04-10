import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { GiMeal } from "react-icons/gi";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SharedModal from "../shared/SharedModal";
import Spinner from "../shared/Spinner/Spinner";
import {
  deleteRecipe,
  deleteStateRecipe,
  getRecipe,
} from "../../store/recipes/recipe-slice";
import { getAllCategories } from "../../store/categories/category-slice";
import { getRecipeIngredients } from "../../store/recipeingredients/recipeingredients-slice";

const RecipeItem = ({ recipe, index }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, isLoading } = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.auth);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getAllCategories({}));
  }, []);

  const getCategoryName = () => {
    if (categories.length > 0) {
      let nameCat = categories.find(
        (category) => category.id === recipe.categoryId
      );
      return nameCat.name;
    } else return <p>No category</p>;
  };

  const handleEdit = () => {
    dispatch(getRecipe(recipe.id));
    dispatch(getRecipeIngredients(recipe.id));
    navigate("/editrecipe");
  };

  if (isLoading) {
    <Spinner />;
  }

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{recipe.name}</td>
        <td>{recipe.description}</td>
        <td>{getCategoryName()}</td>
        <td className="text-success">{recipe.totalCost}</td>
        <td className="text-danger">{recipe.recomendedPrice}</td>
        <td className="d-flex justify-content-end">
          <Link to={`/recipes/${recipe.id}`}>
            <Button variant="success" size="sm" className="me-2">
              Details
            </Button>
          </Link>
          {user && (
            <Button
              variant="warning"
              size="sm"
              className="me-2"
              onClick={handleEdit}
            >
              Edit
            </Button>
          )}
          {user && (
            <Button variant="danger" size="sm" onClick={handleShow}>
              Delete
            </Button>
          )}
        </td>
      </tr>
      <SharedModal
        show={show}
        handleClose={handleClose}
        action={deleteRecipe}
        id={recipe.id}
        dispatch={deleteStateRecipe}
      />
    </>
  );
};

export default RecipeItem;
