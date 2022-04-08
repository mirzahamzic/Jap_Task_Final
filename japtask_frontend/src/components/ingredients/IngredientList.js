import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllIngredients } from "../../store/ingredients/ingredient-slice";
import { Spinner, Table, Container, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import IngredientItem from "./IngredientItem";
import Paginator from "../shared/Paginator";
import { FaSort, FaPlus } from "react-icons/fa";
import Filter from "../shared/Filter";
import { Link } from "react-router-dom";

const IngredientList = () => {
  const {
    ingredients,
    isError,
    isSuccess,
    isLoading,
    message,
    pageSizeRedux,
    minRangeRedux,
    maxRangeRedux,
    unitsRedux,
    nameRedux,
  } = useSelector((state) => state.ingredient);

  const dispatch = useDispatch();

  const [sortBy, setSortBy] = useState("");
  const [sortMethod, setSortMethod] = useState(false);
  const [sort, setSort] = useState("");

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getAllIngredients({}));
  }, [dispatch, isError, isSuccess, message]);

  if (isLoading) {
    <Spinner />;
  }

  const onSort = (sortBy) => {
    setSortMethod(!sortMethod);
    setSortBy(sortBy);
    setSort(sortMethod ? "asc" : "desc");
  };

  useEffect(() => {
    dispatch(
      getAllIngredients({
        pageSize: pageSizeRedux,
        name: nameRedux,
        max: maxRangeRedux,
        min: minRangeRedux,
        unit: unitsRedux,
        page: 1,
        sortBy,
        sort,
      })
    );
  }, [sortBy, sort]);

  return (
    <Container className="my-4">
      <section className="my-5 d-flex justify-content-between">
        <h1>Ingredients</h1>
        <div>
          <Button as={Link} to="/addingredient" variant="success" size="lg">
            <FaPlus /> Add Ingredient
          </Button>
        </div>
      </section>
      <Row className="my-5">
        <Col sm={12} md={8}>
          <Filter />
        </Col>
        <Col sm={12} md={4}>
          <Paginator action={getAllIngredients} />
        </Col>
      </Row>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>
              Ingredient{" "}
              <FaSort
                onClick={() => onSort("Name")}
                style={{ cursor: "pointer" }}
              />
            </th>
            <th>
              Quantity{" "}
              <FaSort
                onClick={() => onSort("PurchasedQuantity")}
                style={{ cursor: "pointer" }}
              />
            </th>
            <th>
              Unit of Measure{" "}
              <FaSort
                onClick={() => onSort("PurchasedUnitOfMeasure")}
                style={{ cursor: "pointer" }}
              />
            </th>
            <th>
              Cost{" "}
              <FaSort
                onClick={() => onSort("PurchasedPrice")}
                style={{ cursor: "pointer" }}
              />
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient, i) => (
            <IngredientItem
              ingredient={ingredient}
              key={ingredient.id}
              index={i}
            />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default IngredientList;
