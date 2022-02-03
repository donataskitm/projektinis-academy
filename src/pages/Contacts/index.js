import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ContactForm from '../../components/ContactForm';

function Contacts() {

  return (

    <Row>
      <Col sm={12} className="text-center text-secondary">
        <ContactForm />
      </Col>
    </Row>
  );
}

export default Contacts;