import React from 'react';
import { Row, Col } from 'react-bootstrap';
import help from '../../data/help';

function Help() {

  return (
    <Row className="mx-3">
      <Col sm={12} className="text-center text-secondary">
        <h4 className="p-5">KAIP NAUDOTI?</h4>
      </Col>
      {help.map((info,index) => (
        <Col sm={12} key={index}>
          <info.type >{info.text}</info.type>
          {info.list && (<ol> {info.list.map((data, key) => (<li key={key}>{data.title}</li>))}</ol>)}
        </Col>
      ))}
    </Row>
  );
}

export default Help;