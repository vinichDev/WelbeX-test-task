import 'bootstrap/dist/css/bootstrap.min.css';
import TableComponent from "./components/TableComponent";
import FilterForm from "./components/FilterForm";
import React, {useEffect, useState} from 'react';
import {fetchData} from "./functions/fetchData";
import SortForm from "./components/SortForm";
import PaginationComponent from "./components/PaginationComponent";

function App() {

  const [tableData, setTableData] = useState(null);

  const updateTableData = () => {
    fetchData().then(response => {
      setTableData(response.data)
    })
  }

  useEffect(() => {
    updateTableData();
  }, [])

  return (
    <div className="w-md-75 mx-auto container" style={{margin: "50px 0"}}>
      <SortForm/>
      <FilterForm updateTableData={updateTableData}/>
      <TableComponent tableData={tableData}/>
      {tableData && <PaginationComponent updateTableData={updateTableData} pageCount={tableData.pageCount}/>}
    </div>);
}

export default App;
