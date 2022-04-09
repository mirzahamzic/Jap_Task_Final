import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { GiMeal } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SharedModal from "../shared/SharedModal";

const RecipeIngredientItem = ({ ingredient, index }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{ingredient.name}</td>
        <td>
            <Form.Control value={ingredient.quantity} />
        </td>
        <td>{ingredient.unit}</td>
        <td className="d-flex justify-content-end">
          <Button variant="warning" size="sm" className="me-2">
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={handleShow}>
            Delete
          </Button>
        </td>
      </tr>
      <SharedModal show={show} handleClose={handleClose} />
    </>
  );
};

export default RecipeIngredientItem;
