import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const SharedModal = (props) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(props.action(props.id));
    dispatch(props.dispatch(props.id));
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
