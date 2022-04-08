import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllIngredients } from "../../store/ingredients/ingredient-slice";

const SharedModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDelete = () => {
    dispatch(props.action(props.id));
    dispatch(getAllIngredients({}));
    toast.info("Element deleted successfully");
    props.handleClose();
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete element</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you wanna delete element?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={onDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SharedModal;
