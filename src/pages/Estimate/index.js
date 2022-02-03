import React from 'react';
import { Row, Col } from 'react-bootstrap';
import EstimateTable from '../../components/EstimateTable';

function Estimate() {

  return (

    <Row>
      <Col sm={12} className="p-5 text-center text-secondary">
        <h4>Dekoratyviųjų žolinių augalų sąmata želdinimo projektui </h4>
      </Col>
      <Col sm={12} className="text-center">
        <EstimateTable />
      </Col>
    </Row>
  );
}

export default Estimate;