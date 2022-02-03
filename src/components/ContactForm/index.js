import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Button from '../Button';
import db from '../../../src/services/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import * as constants from '../../config/constants';
import Input from '../../components/Input';
import Modal from '../../components/Modal';

function ContactForm() {

  const [toSend, setToSend] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [smShow, setSmShow] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();

    //TODO: to move validation to other file
    if (toSend.name.length < constants.MIN_NAME_SYMBOLS) {
      alert('Per trumpas vardas');
      return;
    }
    if (toSend.email === "") {
      alert('Neįvestas el. pašto adresas');
      return;
    }
    if (toSend.message.length < constants.MIN_MESSAGE_SYMBOLS ||
            toSend.message.length > constants.MAX_MESSAGE_SYMBOLS) {
      alert('Žinutė turi  būti ne tumpesnė nei 10 ir ne ilgesnei nei 400 simbolių');
      return;
    }

    addDoc(collection(db, "message-project"), {
      from_name: toSend.name,
      to_name: toSend.email,
      message: toSend.message,
      created: serverTimestamp()
    })
      .then(() => {

        setSmShow(true);
      })
      .catch((err) => {
        alert(err.message);
      });

    setToSend({
      name: '',
      email: '',
      message: '',
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setToSend({ ...toSend, [name]: value });
  };

  const closeModal = () => {
    setSmShow(false);
  };

  return (
    <Row className="text-center">
      <h4 className="p-5"> PARAŠYK ŽINUTĘ</h4>
      <p className="pb-3"> Turi klausimų ar pastebėjimų? Parašyk!</p>
      <Form className="m-auto w-50" onSubmit={onSubmit}>
        <Row className="g-2">
          <Col md>
            <Input
              type="name"
              placeholder="vardas"
              name="name"
              value={toSend.name}
              label="Vardas"
              onChange={handleChange} required />
          </Col>
          <Col md>
            <Input
              type="email"
              placeholder="name@example.com"
              name="email"
              value={toSend.email}
              label="El. pašto adresas"
              onChange={handleChange} required />
          </Col>
        </Row>
        <Row>
          <Form.Group
            className="mb-3 pt-3"
            controlId="exampleForm.ControlTextarea1">
            <Form.Label>Žinutė</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Jūsų žinutė"
              name="message"
              value={toSend.message}
              onChange={handleChange} required />
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
