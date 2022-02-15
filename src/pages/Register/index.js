import React from 'react';
import { Form, Row, Col} from 'react-bootstrap';
import Button from '../../components/Button';
import Input from '../../components/Input';
import useForm from '../../hooks/useForm';
import {validate} from '../../services/validation';
import ErrorMessage from '../../components/ErrorMessage';

function Register() {

  const initialState = {name: '', email: '', password: '', repassword: ''};

  const registerUser = (errors) => {
    if (Object.keys(errors).length === 0){
      console.log("užregistruota");
    } 
  };

  const {inputs, 
    handleInputChange, 
    handleSubmit, 
    errors} = useForm(initialState, validate.validateRegisterForm, registerUser);

  return (
    <Row className="text-center w-100">
      <h4 className="p-5"> REGISTRACIJA</h4>
      <Form className="m-auto w-50" onSubmit={handleSubmit}>
        <Row className="g-2 pb-2">
          <Col sm={6}>
            <Input
              type="name"
              placeholder="Vardas"
              name="name"
              value={inputs.name}
              label = "Vardas"
              onChange={handleInputChange} required />
            {<ErrorMessage message = {errors.name}/>}
          </Col>
          <Col sm={6}>
            <Input
              type="text"
              placeholder="El. pašto adresas"
              name="email"
              value={inputs.email}
              label = "El. pašto adresas"
              onChange={handleInputChange} required />
            {<ErrorMessage message = {errors.email}/>}
          </Col>
        </Row>
        <Row className="g-2">
          <Col sm={6}>
            <Input
              type="password"
              placeholder="Slaptažodis"
              name="password"
              value={inputs.password}
              label = "Slaptažodis"
              onChange={handleInputChange} required />
            {<ErrorMessage message = {errors.password}/>}
          </Col>
          <Col sm={6}>
            <Input
              type="password"
              placeholder="Pakartoti slaptažodį"
              name="repassword"
              value={inputs.repassword}
              label = "Pakartoti slaptažodį"
              onChange={handleInputChange} required />
            {<ErrorMessage message = {errors.repassword}/>}
          </Col>
        </Row>
        <Row className="py-5">
          <Button name={"REGISTRUOTIS"} color={"danger"} />
        </Row>
      </Form>
    </Row>
  );
}

export default Register;