import React, { useState, useEffect } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllIngredients } from "../../store/ingredients/ingredient-slice";

const IngredientsInRecipeForm = (props) => {
  const [inputList, setInputList] = useState([
    { ingredientId: "", quantity: 0, unit: "" },
  ]);

  const dispatch = useDispatch();

  const { ingredients } = useSelector((state) => state.ingredient);

  useEffect(() => {
    dispatch(getAllIngredients({}));
  }, []);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    props.setIngredientList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { ingredientId: "", quantity: 0, unit: "" }]);
    props.setIngredientList(inputList);
  };

  return (
    <>
      {inputList.map((x, i) => {
        return (
          <Row className="my-2" key={i}>
            <Col sm={12} md={3}>
              <Form.Select
                name="ingredientId"
                value={x.ingredientId}
                onChange={(e) => handleInputChange(e, i)}
              >
                <option default>Choose ingredient</option>
                {ingredients &&
                  ingredients.map((ingredient) => (
                    <option key={ingredient.id} value={ingredient.id}>
                      {ingredient.name}
                    </option>
                  ))}
              </Form.Select>
            </Col>

            <Col sm={12} md={3}>
              <Form.Select
                name="unit"
                value={x.unit}
                onChange={(e) => handleInputChange(e, i)}
              >
                <option default>Choose measure unit</option>
                <option value="Kg">Kilogram</option>
                <option value="Gr">Gram</option>
                <option value="L">Liter</option>
                <option value="Ml">Milliliter</option>
                <option value="kom">Piece</option>
              </Form.Select>
            </Col>

            <Col sm={12} md={3}>
              <Form.Control
                type="number"
                min="0"
                step="0.01"
                name="quantity"
                placeholder="Quantity..."
                value={x.quantity}
                onChange={(e) => handleInputChange(e, i)}
              />
            </Col>

            <Col sm={12} md={3}>
              {inputList.length !== 1 && (
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleRemoveClick(i)}
                  className="me-3"
                >
                  Remove
                </Button>
              )}
              {inputList.length - 1 === i && (
                <Button size="sm" variant="success" onClick={handleAddClick}>
                  Add
                </Button>
              )}
            </Col>
          </Row>
        );
      })}
    </>
  );
};

export default IngredientsInRecipeForm;
