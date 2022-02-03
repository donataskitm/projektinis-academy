import React from 'react';
import { Row, Col } from 'react-bootstrap';
import about from '../../data/about';

function About() {

  return (
    <Row>
      <Col sm={12} className="text-center text-secondary">
        <h4 className="p-5">APIE PROJEKTĄ</h4>
      </Col>
      {about.map((info,index) => (<Col sm={6} key={index}>
        <info.type >{info.text}</info.type>
      </Col>))}
      <Col sm={6} className="pt-5">
        <h6>Apie projektą žiniasklaidoje</h6>
      </Col>
      <Col sm={12}>
        <a rel="noopener noreferrer" 
          href= {process.env.REACT_APP_DELFI}
          target="_blank">
          <img
            src="/pic/delfi_logo.png"
            className='img-fluid hover-shadow '
            alt='delfi'
            width="100px"
          />
        </a>
        <img
          src="/pic/valst.jpg"
          className='img-fluid hover-shadow p-2'
          alt='laikrastis'
          width="150px"
        />
      </Col>
    </Row>
  );
}

export default About;