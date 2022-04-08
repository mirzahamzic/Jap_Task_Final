import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { unit } from "../../helpers/convertUnits";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getIngredient,
  deleteIngredient,
} from "../../store/ingredients/ingredient-slice";
import SharedModal from "../shared/SharedModal";

const IngredientItem = ({ ingredient, index }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = () => {
    dispatch(getIngredient(ingredient.id));
    navigate("/editingredient");
  };

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{ingredient.name}</td>
        <td>{ingredient.purchasedQuantity.toFixed(2)}</td>
        <td>{unit(ingredient.purchasedUnitOfMeasure)}</td>
        <td className="text-success">{ingredient.purchasedPrice} KM</td>
        <td className="d-flex justify-content-end">
          <Button
            variant="warning"
            size="sm"
            className="me-2"
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={handleShow}>
            Delete
          </Button>
        </td>
      </tr>
      <SharedModal
        show={show}
        handleClose={handleClose}
        action={deleteIngredient}
        id={ingredient.id}
      />
    </>
  );
};

export default IngredientItem;