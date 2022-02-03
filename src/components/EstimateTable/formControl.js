import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {CategoryContext} from '../../services/context';

const ControlForm = (props)=> {

  const value = React.useContext(CategoryContext);

  return (

    <Form.Control
      onChange={(event) => { value.getValue(event, props.data);}}
      type="number"
      step="0.1"
      min="0"
      className="w-50 text-center m-auto"
      value={props.value || ''}
      id={props.id }/>
  );
};
  
ControlForm.propTypes = {
  value: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
  
export default ControlForm;