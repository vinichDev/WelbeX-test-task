import React from 'react';
import {Pagination} from "react-bootstrap";
import {useSearchParams} from "react-router-dom";

const PaginationComponent = ({updateTableData, pageCount}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onClickPaginationItem = (e) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", e.target.text);
    setSearchParams(params);
    updateTableData();
  }

  return (
    <div>
      <Pagination>
        {
          [...Array(pageCount).keys()].map((item) => (
            <Pagination.Item
              key={item}
              active={`${item + 1}` === searchParams.get("page") || (!item && !searchParams.get("page"))}
              onClick={onClickPaginationItem}
            >
              {item + 1}
            </Pagination.Item>
          ))
        }
      </Pagination>
    </div>
  );
};

export default PaginationComponent;