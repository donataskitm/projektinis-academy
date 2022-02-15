import React, { useRef } from 'react';
import ReactToPrint from "react-to-print";
import EstimateTable from "../components/EstimateTable";

function printPdf() {
  let componentRef = useRef();

  return (
    <>
      <div>
        {/* button to trigger printing of target component */}
        <ReactToPrint
          trigger={() => <button>Print this out!</button>}
          content={() => componentRef}
        />
  
        {/* component to be printed */}
        <EstimateTable ref={(el) => (componentRef = el)} />
      </div>
    </>
  );
}
export default printPdf;