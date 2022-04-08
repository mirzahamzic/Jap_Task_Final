import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  addIngredient,
  updateIngredient,
} from "../../store/ingredients/ingredient-slice";

const IngredientForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentIngredient } = useSelector((state) => state.ingredient);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  useEffect(() => {
    if (Object.keys(currentIngredient).length > 0) {
      reset(currentIngredient);
    } else {
      reset();
    }
  }, [currentIngredient, reset]);

  const onSubmit = (data) => {
    data.purchasedUnitOfMeasure = parseInt(data.purchasedUnitOfMeasure);
    if (Object.keys(currentIngredient).length === 0) {
      dispatch(addIngredient(data));
      toast.info("Ingredient added.");
      navigate("/ingredients");
    } else {
      dispatch(updateIngredient(data));
      toast.info("Ingredient updated.");
      clearForm();
      navigate("/ingredients");
    }
  };

  const clearForm = () => {
    reset({
      name: "",
      purchasedQuantity: "",
      purchasedUnitOfMeasure: "",
      purchasedPrice: "",
    });
  };

  return (
    <Container className="my-5 w-75">
      <h3>Add Ingredient</h3>
      <hr />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Ingredient name</Form.Label>
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
          <Form.Label>Purchased quantity</Form.Label>
          <Form.Control
            type="number"
            min="0"
            step="0.1"
            placeholder="Quantity..."
            {...register("purchasedQuantity", {
              required: "Quantity is required.",
            })}
            isInvalid={errors.purchasedQuantity}
          />
          <Form.Control.Feedback type="invalid">
            {errors.purchasedQuantity && errors.purchasedQuantity.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ingredient price</Form.Label>
          <Form.Control
            type="number"
            min="0"
            step="0.1"
            placeholder="Price..."
            {...register("purchasedPrice", {
              required: "Price is required.",
            })}
            isInvalid={errors.purchasedPrice}
          />
          <Form.Control.Feedback type="invalid">
            {errors.purchasedPrice && errors.purchasedPrice.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Unit of measure</Form.Label>
          <Form.Select
            {...register("purchasedUnitOfMeasure", {
              required: "Unit of measure is required.",
            })}
            isInvalid={errors.purchasedUnitOfMeasure}
          >
            <option default disabled>
              Choose measure unit
            </option>
            <option value="0">Kilogram</option>
            <option value="1">Gram</option>
            <option value="2">Liter</option>
            <option value="3">Milliliter</option>
            <option value="4">Pieces</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.purchasedUnitOfMeasure &&
              errors.purchasedUnitOfMeasure.message}
          </Form.Control.Feedback>
        </Form.Group>

        <hr />
        <div className="my-4 d-flex justify-content-between">
          <Button variant="success" type="submit">
            Submit
          </Button>
          {currentIngredient && <Button onClick={clearForm}>Clear</Button>}
          {/* <BackButton url="/home" /> */}
        </div>
      </Form>
    </Container>
  );
};

export default IngredientForm;
