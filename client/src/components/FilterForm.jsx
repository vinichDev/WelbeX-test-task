import React from 'react';
import {Button, Form} from "react-bootstrap";
import {useSearchParams} from "react-router-dom";

export const FilterForm = ({updateTableData}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onChangeFilterColumn = (e) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value === "title") {
      params.delete("filterColumn", e.target.value)
    } else {
      params.set("filterColumn", e.target.value);
    }
    params.delete("filterCondition");
    params.delete("filterValue");
    setSearchParams(params);
  }

  const onChangeFilterCondition = (e) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value === "title") {
      params.delete("filterCondition", e.target.value)
    } else {
      params.set("filterCondition", e.target.value);
    }
    params.delete("filterValue");
    setSearchParams(params);
  }

  const onChangeFilterValue = (e) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value === "") {
      params.delete("filterValue", e.target.value)
    } else {
      params.set("filterValue", e.target.value);
    }
    setSearchParams(params);
  }

  return (
    <Form className="mt-3">
      <p>Фильтр</p>
      <div className="row">
        <div className="col-md-3">
          <Form.Select
            value={searchParams.get("filterColumn") || "title"}
            onChange={onChangeFilterColumn}
          >
            <option value="title">Select column</option>
            <option value="date">date</option>
            <option value="name">name</option>
            <option value="count">count</option>
            <option value="distance">distance</option>
          </Form.Select>
        </div>
        <div className="col-md-3 mt-3 mt-md-0">
          <Form.Select
            value={searchParams.get("filterCondition") || "title"}
            onChange={onChangeFilterCondition}
          >
            <option value="title">Select condition</option>
            <option value="equal">equal</option>
            <option value="greater">greater than</option>
            <option value="less">less than</option>
            {searchParams.get("filterColumn") === "name" && <option value="contain">contain</option>}
          </Form.Select>
        </div>
        <div className="col-md-3 mt-3 mt-md-0">
          <Form.Control
            placeholder="Enter value"
            value={searchParams.get("filterValue") || ""}
            onChange={onChangeFilterValue}
          />
        </div>
        <div className="col-md-3 mt-3 mt-md-0">
          {/*Update table with sort and filter*/}
          <Button className="w-100" onClick={() => updateTableData()}>
            Применить
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default FilterForm;