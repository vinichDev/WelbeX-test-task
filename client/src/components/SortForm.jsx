import React from 'react';
import {Form} from "react-bootstrap";
import {useSearchParams} from "react-router-dom";

const SortForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onChangeSortColumn = (e) => {
    const params = new URLSearchParams(searchParams);
    if(e.target.value === "title"){
      params.delete("sortColumn", e.target.value)
    } else {
      params.set("sortColumn", e.target.value);
    }
    setSearchParams(params);
  }

  return (
    <div>
      <p>Сортировать по:</p>
      <div className="row">
        <div className="col-md-3">
        <Form.Select
                     value={searchParams.get("sortColumn") || "title"}
                     onChange={onChangeSortColumn}
        >
          <option value="title">Select column</option>
          <option value="name">name</option>
          <option value="count">count</option>
          <option value="distance">distance</option>
        </Form.Select>
        </div>
        <div className="col-md-9"/>
      </div>
    </div>
  );
};

export default SortForm;
