import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getRecipesByCategory,
  searchRecipes,
  reset,
} from "../../store/recipes/recipe-slice";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import { GiTakeMyMoney } from "react-icons/gi";
import Search from "../shared/Search";

const RecipesByCategory = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  const categoryName = location.state.name;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    recipesByCategory,
    isError,
    isSuccess,
    isLoading,
    message,
    searchTerm,
  } = useSelector((state) => state.recipe);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getRecipesByCategory(categoryId));
  }, [isSuccess, categoryId, isError]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length > 2) {
        dispatch(searchRecipes(searchTerm));
      } else {
        dispatch(getRecipesByCategory(categoryId));
      }
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, categoryId, dispatch]);

  if (isLoading) {
    <h3>Loading...</h3>;
  }

  return (
    <Container className="my-4">
      <div className="text-warning">
        <h1 className="my-4">Category: {categoryName}</h1>
      </div>
      <div className="my-5">
        <Search />
      </div>
      <hr />
      {recipesByCategory.length > 0
        ? recipesByCategory
            .map((item) => item)
            .sort((a, b) => a.cost - b.cost)
            .map((recipe, i) => (
              <div key={recipe.id}>
                <Row>
                  <Col sm={12} md={6}>
                    <h2>{recipe.name}</h2>
                  </Col>
                  <Col sm={12} md={4}>
                    <h2>
                      <GiTakeMyMoney className="text-success" />{" "}
                      {recipe.totalCost} KM{" "}
                    </h2>
                  </Col>
                  <Col sm={12} md={2}>
                    <Link to={`/recipes/${recipe.id}`}>
                      <Button variant="success">Details</Button>
                    </Link>
                  </Col>
                </Row>
                <hr />
              </div>
            ))
        : "Please add some recipes to this category."}
    </Container>
  );
};

export default RecipesByCategory;
