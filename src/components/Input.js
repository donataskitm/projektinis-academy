import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, FloatingLabel } from 'react-bootstrap';


function Input(props) {
    
  return (
    <Col md>
      <FloatingLabel controlId={props.label} label={props.label}>
        <Form.Control
          className = {props.color}
          type={props.type}
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
          autoComplete="on"
          onChange={props.onChange} />
      </FloatingLabel>
    </Col>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  onChange: ()=>{},
  color: "",
};
  
export default Input;