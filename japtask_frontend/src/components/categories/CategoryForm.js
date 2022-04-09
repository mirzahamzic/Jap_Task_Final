import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import Spinner from '../shared/Spinner/Spinner'
import { toast } from "react-toastify";
import { updateCategory, addCategory } from "../../store/categories/category-slice";

const CategoryForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentCategory } = useSelector((state) => state.category);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (Object.keys(currentCategory).length > 0) {
      reset(currentCategory);
    } else {
      clearForm();
    }
  }, [currentCategory, reset]);

  const onSubmit = (data) => {
    if (Object.keys(currentCategory).length === 0) {
      dispatch(addCategory(data));
      toast.info("Category added.");
      navigate("/categories");
    } else {
      dispatch(updateCategory(data));
      toast.info("Category updated.");
      clearForm();
      navigate("/categories");
    }
  };

  const clearForm = () => {
    reset({
      name: "",
    });
  };

  return (
    <Container className="my-5 w-75">
      <h3>Add Category</h3>
      <hr />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Category name</Form.Label>
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
        <hr />
        <div className="my-4 d-flex justify-content-between">
          <Button variant="success" type="submit">
            Submit
          </Button>
          {currentCategory && <Button onClick={clearForm}>Clear</Button>}
          {/* <BackButton url="/home" /> */}
        </div>
      </Form>
    </Container>
  );
};

export default CategoryForm;
