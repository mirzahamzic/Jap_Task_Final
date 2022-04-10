import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../../store/categories/category-slice";
import { toast } from "react-toastify";
import CategoryItem from "./CategoryItem";
import { FaPlus } from "react-icons/fa";
import Paginator from "../shared/Paginator";
import Spinner from "../shared/Spinner/Spinner";

const CategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, isError, isLoading, message } = useSelector(
    (state) => state.category
  );

  const { user } = useSelector((state) => state.auth);


  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getAllCategories({}));
  }, [isError, dispatch, message]);

  if (isLoading) {
    <Spinner />;
  }

  return (
    <Container>
      <section className="my-5 d-flex justify-content-between">
        <h1>Categories</h1>
        <div>
          {user && <Button as={Link} to="/addcategory" variant="success" size="lg">
            <FaPlus /> Add Category
          </Button>}
        </div>
      </section>
      <section className="my-2 d-flex justify-content-end">
        <div>
          <Paginator action={getAllCategories} />
        </div>
      </section>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th width="10%">#</th>
            <th width="60%">Category name</th>
            <th width="30%">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, i) => (
            <CategoryItem category={category} key={category.id} index={i} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CategoryList;
