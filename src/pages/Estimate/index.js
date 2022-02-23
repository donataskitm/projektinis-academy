//import React from 'react';
import { Row, Col } from 'react-bootstrap';
import EstimateTable from '../../components/EstimateTable';
import React, { useRef } from 'react';
import {useReactToPrint} from "react-to-print";

function Estimate() {

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (

    <Row className="gx-0">
      <Col sm={12} className="p-5 text-center text-secondary">
        <h4>Dekoratyviųjų žolinių augalų sąmata želdinimo projektui </h4>
      </Col>
      <Col sm={12} className="text-center">
        <EstimateTable ref={componentRef} onClick={handlePrint} />
      </Col>
    </Row>
  );
}

export default Estimate;