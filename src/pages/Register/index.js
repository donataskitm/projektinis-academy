import React, {useState} from 'react';
import { Form, Row, Col} from 'react-bootstrap';
import Button from '../../components/Button';
import Input from '../../components/Input';

function Register() {

  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
    repassword: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegister((previuosValue) => ({
      ...previuosValue,
      [name]: value,
    }));
  };

  const onSubmit = () => {

  };

  return (
    <Row className="text-center">
      <h4 className="p-5"> REGISTRACIJA</h4>
      <Form className="m-auto w-100" onSubmit={onSubmit}>
        <Row className="g-2 pb-2">
          <Col md>
            <Input
              type="name"
              placeholder="Vardas"
              name="name"
              value={register.name}
              label = "Vardas"
              onChange={handleChange} required />
          </Col>
          <Col md>
            <Input
              type="email"
              placeholder="El. pašto adresas"
              name="email"
              value={register.email}
              label = "El. pašto adresas"
              onChange={handleChange} required />
          </Col>
        </Row>
        <Row className="g-2">
          <Col md>
            <Input
              type="password"
              placeholder="Slaptažodis"
              name="password"
              value={register.password}
              label = "Slaptažodis"
              onChange={handleChange} required />
          </Col>
          <Col md>
            <Input
              type="password"
              placeholder="Pakartoti slaptažodį"
              name="repassword"
              value={register.repassword}
              label = "Pakartoti slaptažodį"
              onChange={handleChange} required />
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