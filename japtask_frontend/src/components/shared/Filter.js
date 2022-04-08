import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getAllIngredients } from "../../store/ingredients/ingredient-slice";
import { setFilterParams } from "../../store/ingredients/ingredient-slice";
import { unitReverse } from "../../helpers/convertUnits";

const Filter = () => {
  const dispatch = useDispatch();

  const initialFormValues = {
    name: "",
    min: "",
    max: "",
    unit: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const filterTable = () => {
    if (
      (formValues.min === "" && formValues.max != "") ||
      (formValues.min != "" && formValues.max === "")
    ) {
      toast.error("Both min or max fields needs to have a value");
      return;
    }
    formValues.unit = unitReverse(formValues.unit.toLowerCase());
    dispatch(setFilterParams(formValues));
    dispatch(getAllIngredients(formValues));
  };

  return (
    <Form>
      <Row>
        <Col sm={12} md={2}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Ingredient..."
              size="sm"
              name="name"
              value={formValues.ingredient}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col sm={12} md={2}>
          <Form.Group>
            <Form.Control
              type="number"
              min="1"
              step="0.1"
              placeholder="Min..."
              size="sm"
              name="min"
              value={formValues.min}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col sm={12} md={2}>
          <Form.Group>
            <Form.Control
              type="number"
              min="1"
              step="0.1"
              placeholder="Max..."
              size="sm"
              name="max"
              value={formValues.max}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col sm={12} md={2}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Unit..."
              size="sm"
              name="unit"
              value={formValues.unit}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col sm={12} md={2}>
          <Button size="sm" onClick={filterTable}>
            Filter
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Filter;
