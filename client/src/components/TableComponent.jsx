import React from 'react';
import {Table} from "react-bootstrap";

const TableComponent = ({tableData}) => {
  return (
    <div className="mt-5">
      <Table striped bordered hover>
        <thead>
        <tr>
          <th scope="col">date</th>
          <th scope="col">name</th>
          <th scope="col">count</th>
          <th scope="col">distance</th>
        </tr>
        </thead>
        <tbody>
        {tableData && tableData.table.map((row, rowNumber) => (
          <tr key={rowNumber}>
            <td>{new Date(row.date).toLocaleDateString()}</td>
            <td>{row.name}</td>
            <td>{row.count}</td>
            <td>{row.distance}</td>
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;