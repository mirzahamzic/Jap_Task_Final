import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { GiMeal } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SharedModal from "../shared/SharedModal";
import { toast } from "react-toastify";
import { getAllIngredients } from "../../store/ingredients/ingredient-slice";
import {
  addIngredientToRecipe,
  deleteRecipeIngredients,
  deleteStateRecipeIngredient,
  getRecipeIngredients,
  updateRecipeIngredients,
} from "../../store/recipeingredients/recipeingredients-slice";

const RecipeIngredientItem = ({ recipeIngredient, index }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ingInRecipe, setIngInRecipe] = useState({
    ingredientId: recipeIngredient.ingredientId,
    quantity: recipeIngredient.quantity,
    unit: recipeIngredient.unit,
  });

  const { ingredients } = useSelector((state) => state.ingredient);
  const { currentRecipe } = useSelector((state) => state.recipe);

  useEffect(() => {
    dispatch(getAllIngredients({}));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIngInRecipe({
      ...ingInRecipe,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    if (
      ingInRecipe === "" ||
      ingInRecipe.quantity === "" ||
      ingInRecipe.unit === ""
    ) {
      toast.error("Ingredient in recipe must have value.");
      return;
    }
    ingInRecipe.id = recipeIngredient.id;
    alert(JSON.stringify(ingInRecipe));
    dispatch(
      updateRecipeIngredients({
        data: ingInRecipe,
        recipeId: currentRecipe.id,
      })
    );
    dispatch(addIngredientToRecipe({ingInRecipe}))
    toast.info("Ingredient in recipe updated.");
    // navigate("/recipes");
    dispatch(getRecipeIngredients(currentRecipe.id));
  };

  const handleDelete = () => {
    dispatch(
      deleteRecipeIngredients({
        recipeId: currentRecipe.id,
        id: recipeIngredient.id,
      })
    );
    dispatch(deleteStateRecipeIngredient(recipeIngredient.id));
    toast.info("Ingredient in recipe removed.");

  };

  return (
    <>
      <Row className="my-2">
        <Col sm={12} md={3}>
          <Form.Select
            name="ingredientId"
            value={ingInRecipe.ingredientId}
            onChange={handleInputChange}
          >
            <option value={recipeIngredient.ingredientId} default>
              {recipeIngredient.name}
            </option>
            {ingredients &&
              ingredients.map((ingredient) => {
                return (
                  <option key={ingredient.id} value={ingredient.id}>
                    {ingredient.name}
                  </option>
                );
              })}
          </Form.Select>
        </Col>

        <Col sm={12} md={3}>
          <Form.Select
            name="unit"
            value={ingInRecipe.unit}
            onChange={handleInputChange}
          >
            <option value={recipeIngredient.unit} default>
              {recipeIngredient.unit}
            </option>
            <option value="Kg">Kg</option>
            <option value="Gr">Gr</option>
            <option value="L">L</option>
            <option value="Ml">Ml</option>
            <option value="kom">kom</option>
          </Form.Select>
        </Col>

        <Col sm={12} md={3}>
          <Form.Control
            type="number"
            min="0"
            step="0.01"
            name="quantity"
            value={ingInRecipe.quantity}
            onChange={handleInputChange}
          />
        </Col>

        <Col sm={12} md={3}>
          <Button
            variant="warning"
            size="sm"
            className="me-2"
            onClick={handleUpdate}
          >
            Update
          </Button>
          <Button variant="danger" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default RecipeIngredientItem;
