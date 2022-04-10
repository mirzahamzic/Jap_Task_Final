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
    if (pageSize == "Records") {
      return;
    }
    dispatch(setPageSizeRedux(pageSize));
    dispatch(props.action({ pageSize, page: 1 }));
  }, [pageSize, dispatch]);

  return (
    <>
      <Form.Select onChange={onPageChange} value={pageSize}>
        <option default>Records</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </Form.Select>
    </>
  );
};

export default Paginator;
