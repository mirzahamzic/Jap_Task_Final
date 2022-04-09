import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getAllRecipes } from "../../store/recipes/recipe-slice";
import { toast } from "react-toastify";
import Spinner from "../shared/Spinner/Spinner";
import { Container, Table, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import Paginator from "../shared/Paginator";
import RecipeItem from "./RecipeItem";

const RecipeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { recipes, isError, isLoading, message } = useSelector(
    (state) => state.recipe
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getAllRecipes({ pageSize: 5, page: 1 }));
  }, [isError, dispatch, message]);

  if (isLoading) {
    <Spinner />;
  }

  return (
    <Container>
      <section className="my-5 d-flex justify-content-between">
        <h1>Recipes</h1>
        <div>
          <Button as={Link} to="/addrecipe" variant="success" size="lg">
            <FaPlus /> Add Recipe
          </Button>
        </div>
      </section>
      <section className="my-2 d-flex justify-content-end">
        <div>
          <Paginator action={getAllRecipes} />
        </div>
      </section>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th width="5%">#</th>
            <th width="20%">Recipe name</th>
            <th width="50%">Description</th>
            <th width="10%">Category</th>
            <th width="30%">Action</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe, i) => (
            <RecipeItem recipe={recipe} key={recipe.id} index={i} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default RecipeList;
