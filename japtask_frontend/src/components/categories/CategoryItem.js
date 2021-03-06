import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { GiMeal } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SharedModal from "../shared/SharedModal";
import {
  getCategory,
  deleteCategory,
  getAllCategories,
  deleteStateCategory,
} from "../../store/categories/category-slice";

const CategoryItem = ({ category, index }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = () => {
    dispatch(getCategory(category.id));
    navigate("/editcategory");
  };

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{category.name}</td>
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
        action={deleteCategory}
        id={category.id}
        dispatch={deleteStateCategory}
      />
    </>
  );
};

export default CategoryItem;
