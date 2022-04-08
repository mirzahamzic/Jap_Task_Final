import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../../store/categories/category-slice";
import { toast } from "react-toastify";
import CategoryItem from "./CategoryItem";
import { FaPlus } from "react-icons/fa";

const CategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, isError, isSuccess, message, isLoadMore } = useSelector(
    (state) => state.category
  );

  const [limit, setLimit] = useState(0);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getAllCategories(limit));
  }, [isError, limit]);

  return (
    <Container>
      <section className="my-5 d-flex justify-content-between">
        <h1>Categories</h1>
        <div>
          <Button as={Link} to="/addcategory" variant="success" size="lg">
            <FaPlus /> Add Category
          </Button>
        </div>
      </section>{" "}
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
