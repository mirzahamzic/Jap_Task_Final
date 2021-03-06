import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { getAllCategories } from "../../store/categories/category-slice";
import IngredientsInRecipeForm from "./IngredientsInRecipeForm";
import {
  addRecipe,
  resetCurrent,
  resetMessage,
  updateRecipe,
} from "../../store/recipes/recipe-slice";
import { toast } from "react-toastify";
import RecipeIngredientList from "./RecipeIngredientList";
import { checkAddOrUpdate } from "../../helpers/helpers";

const RecipeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.category);
  const { currentRecipe, message, isError } = useSelector(
    (state) => state.recipe
  );

  const [ingredientList, setIngredientList] = useState([
    { ingredientId: "", quantity: 0, unit: "" },
  ]);
  const [checked, setChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    dispatch(getAllCategories({}));
  }, []);

  useEffect(() => {
    if (Object.keys(currentRecipe).length > 0) {
      reset(currentRecipe);
    } else {
      reset();
    }
  }, [currentRecipe, reset]);

  const onSubmit = (data) => {
    console.log(ingredientList);
    data.addRecipeIngredientDto = ingredientList;

    if (Object.keys(currentRecipe).length === 0) {
      dispatch(addRecipe(data));
      if (isError) {
        toast.error(message);
        dispatch(resetMessage());
        return;
      }
      toast.info("Ingredient added.");
      navigate("/recipes");
    } else {
      data.addRecipeIngredientDto = [];
      data.id = currentRecipe.id;
      if (isError) {
        toast.error(message);
        dispatch(resetMessage());
        return;
      }
      dispatch(updateRecipe(data));
      toast.info("Recipe updated.");
      clearForm();
      navigate("/recipes");
    }
  };

  const clearForm = () => {
    reset({
      name: "",
      description: "",
      category: "",
    });
    dispatch(resetCurrent());
  };

  const addOrEdit = checkAddOrUpdate(currentRecipe);


  return (
    <Container className="my-5">
      <h3>{addOrEdit} recipe</h3>
      <hr />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Recipe name</Form.Label>
          <Form.Control
            as="input"
            placeholder="Name..."
            {...register("name", {
              required: "Name is required.",
            })}
            isInvalid={errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name && errors.name.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Description..."
            {...register("description", {
              required: "Description is required.",
            })}
            isInvalid={errors.description}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description && errors.description.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Recipe category</Form.Label>
              <Form.Select
                {...register("categoryId", {
                  required: "Category is required.",
                })}
                isInvalid={errors.categoryId}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.categoryId && errors.categoryId.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={{ span: 4, offset: 4 }}>
            {Object.keys(currentRecipe).length !== 0 && (
              <Form.Group>
                <Form.Check
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  label="Add Recommended price for recipe?"
                ></Form.Check>
              </Form.Group>
            )}

            {checked && (
              <Form.Control
                type="number"
                min="0"
                step="0.01"
                {...register("recomendedPrice")}
                placeholder="Recommendend price..."
              />
            )}
          </Col>
        </Row>

        <p>{addOrEdit} ingredients in recipe</p>

        {Object.keys(currentRecipe).length === 0 && (
          <IngredientsInRecipeForm setIngredientList={setIngredientList} />
        )}
        {Object.keys(currentRecipe).length !== 0 && <RecipeIngredientList />}
        <hr />
        <div className="my-4 d-flex justify-content-between">
          <Button variant="success" type="submit">
            Submit
          </Button>
          {Object.keys(currentRecipe).length !== 0 && (
            <Button onClick={clearForm}>Clear</Button>
          )}
          {/* <BackButton url="/home" /> */}
        </div>
      </Form>
    </Container>
  );
};

export default RecipeForm;
