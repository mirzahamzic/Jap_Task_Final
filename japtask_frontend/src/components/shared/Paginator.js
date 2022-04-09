import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { setPageSizeRedux } from "../../store/paging/page-slice";

const Paginator = (props) => {
  const [pageSize, setPageSize] = useState("5");
  const dispatch = useDispatch();

  const onPageChange = (e) => {
    if (e.target.value === "Choose pagination") return;
    setPageSize(e.target.value);
  };

  useEffect(() => {
    dispatch(setPageSizeRedux(pageSize));
    dispatch(props.action({ pageSize, page: 1 }));
  }, [pageSize, dispatch]);

  return (
    <>
      <Form.Select onChange={onPageChange} value={pageSize}>
        <option default>Ingredients number</option>
        <option value="5">1-5</option>
        <option value="10">5-10</option>
        <option value="15">15-20</option>
        <option value="20">20-25</option>
        <option value="25">25-30</option>
      </Form.Select>
    </>
  );
};

export default Paginator;
