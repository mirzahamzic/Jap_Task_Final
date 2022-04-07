import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getRecipeById, reset } from "../store/recipes/recipe-slice";
import { Container, Button, Table } from "react-bootstrap";
import { GiMeal } from "react-icons/gi";

const RecipeDetail = () => {
  const { recipeId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentRecipe, isError, isSuccess, isLoading, message, reset } =
    useSelector((state) => state.recipe);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getRecipeById(recipeId));
  }, [isSuccess, recipeId, isError]);

  if (isLoading) {
    <h3>Loading...</h3>;
  }

  return (
    <Container className="my-4">
      <h1 className="my-4">
        <GiMeal className="text-warning" />
        <span className="ms-4">{currentRecipe.name}</span>
      </h1>
      <hr />
      <div>
        <h1 className="my-5">
          Recipe cost:{" "}
          <span className="text-success">
            {currentRecipe &&
              currentRecipe.cost &&
              currentRecipe.cost.toFixed(2)}{" "}
            KM
          </span>
        </h1>
      </div>
      <div>
        <h6>{currentRecipe.description}</h6>
      </div>
      <div className="my-4">
        <h4 className="my-5">Ingredients:</h4>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Ingredient</th>
              <th>Quantity</th>
              <th>Unit of Measure</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {currentRecipe &&
              currentRecipe.ingredients &&
              currentRecipe.ingredients.map((ingredient, i) => (
                <tr key={ingredient.id}>
                  <td>{i + 1}</td>
                  <td>{ingredient.name}</td>
                  <td>{ingredient.quantity.toFixed(2)}</td>
                  <td>{ingredient.unit}</td>
                  <td className="text-success">
                    {ingredient.cost} KM
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default RecipeDetail;
