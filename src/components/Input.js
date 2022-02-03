import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, FloatingLabel } from 'react-bootstrap';


function Input(props) {
    
  return (
    <Col md>
      <FloatingLabel controlId={props.label} label={props.label}>
        <Form.Control
          type={props.type}
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
          autoComplete="on"
          onChange={props.onChange} required />
      </FloatingLabel>
    </Col>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  onChange: ()=>{}
};
  
export default Input;