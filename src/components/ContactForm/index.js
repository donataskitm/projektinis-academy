import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Button from '../Button';
//import * as constants from '../../config/constants';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import {validate} from '../../services/validation';
import ErrorMessage from '../ErrorMessage';
import useForm from '../../hooks/useForm';
import { FirebaseHelper } from '../../services/firebaseHelper';

function ContactForm() {
  const [smShow, setSmShow] = useState(false);
  
  const initialState = {
    name:'', email:'', message:''
  };

  const saveMessage = (errors) => {
    if (Object.keys(errors).length === 0){
      console.log(Object.keys(errors).length);
      FirebaseHelper.SaveMessageToFirebase(setSmShow, inputs);
    } 
  };

  const {inputs, 
    handleInputChange, 
    handleSubmit, 
    errors} = useForm(initialState, validate.validateContactForm, saveMessage);
    
  const closeModal = () => {
    setSmShow(false);
  };

  return (
    <Row className="text-center w-100">
      <h4 className="p-5"> PARAŠYK ŽINUTĘ</h4>
      <p className="pb-3"> Turi klausimų ar pastebėjimų? Parašyk!</p>
      <Form className="m-auto w-50" onSubmit={handleSubmit}>
        <Row className="g-2">
          <Col sm={6}>
            <Input
              type="text"
              placeholder="vardas"
              name="name"
              value={inputs.name}
              color={errors.name && 'border-danger' }
              label="Vardas"
              onChange={handleInputChange}  />
            {<ErrorMessage message = {errors.name}/>}
          </Col>
          <Col sm={6}>
            <Input
              type="text"
              placeholder="name@example.com"
              name="email"
              color={errors.email && 'border-danger' }
              value={inputs.email}
              label="El. pašto adresas"
              onChange={handleInputChange} required />
            {<ErrorMessage message = {errors.email}/>}
          </Col>
        </Row>
        <Row sm={12}>
          <Form.Group
            className="mb-3 pt-3"
            controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Jūsų žinutė"
              name="message"
              value={inputs.message}
              className = {errors.message && 'border-danger' }
              onChange={handleInputChange}  />
            {<ErrorMessage message = {errors.message}/>}
          </Form.Group>
        </Row>
        <Row className="py-5">
          <Button name={"SIŲSTI ŽINUTĘ"} color={"danger"} />
          <Modal
            show={smShow}
            onHide={closeModal}
            message="Žinutė išsiųsta"
            comment="Atsakysiu kuo skubiau"
          ></Modal>
        </Row>
      </Form>
    </Row>
  );
}
export default ContactForm;
