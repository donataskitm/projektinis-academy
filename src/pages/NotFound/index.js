import React from 'react';
import { Row, Col } from 'react-bootstrap';
import "./style.css";

function NotFound() {

  return (
    <Row>
      <Col sm={12} className="text-center text-secondary">
        <h4 className="p-5">PUSLAPIS NERASTAS</h4>      
        <img
          src="/pic/404.jpg"
          className='img-not-found'
          alt='pot'
        />
      </Col>

    </Row>
  );
}

export default NotFound;