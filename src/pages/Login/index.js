import React from 'react';
import { Form, Row, Col} from 'react-bootstrap';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { HeaderContext } from '../../contexts/context';
import { useNavigate } from 'react-router-dom';
import {validate} from '../../services/validation';
import useForm from '../../hooks/useForm';
import ErrorMessage from '../../components/ErrorMessage';

function Login() {

  const initialState = {name:'', password:''};

  const loginUser = (errors) => {
    if (Object.keys(errors).length === 0){
      console.log(Object.keys(errors).length);
      fetchToken(inputs, value, navigate);
    } 
  };

  const {inputs, 
    handleInputChange, 
    handleSubmit, 
    errors} = useForm(initialState, validate.validateLoginForm, loginUser);

  const value = React.useContext(HeaderContext);  
  const navigate = useNavigate();

  return (
    <Row className="text-center w-100">
      <h4 className="p-5"> PRISIJUNGTI</h4>
      <Form className="m-auto w-50  " onSubmit={handleSubmit}>
        <Row className="g-2 pb-2 m-auto">
          <Col sm={6} >
            <Input
              type="name"
              placeholder="Vardas"
              name="name"
              value={inputs.name}
              color={errors.name && 'border-danger' }
              label="Vartotojo vardas"
              onChange={handleInputChange} />
            {<ErrorMessage message = {errors.name}/>}
          </Col>
          <Col sm={6} >
            <Input
              type="password"
              placeholder="Slaptažodis"
              name="password"
              value={inputs.password}
              label="Slaptažodis"
              color={errors.password && 'border-danger' }
              onChange={handleInputChange} />
            {<ErrorMessage message = {errors.password}/>}
          </Col>
        </Row>
        
        <div id="kontaktai"></div>
        <Row className="py-5">
          <Button name={"PRISIJUNGTI"} color={"warning"} />
        </Row>
      </Form>
    </Row>
  );
}

export default Login;
//TODO: to use dry code principle
function fetchToken(inputs, value, navigate) {

  let config = {
    method: "POST",
    headers: [
      ["Content-Type", "application/json"],
      ["Content-Type", "text/plain"]
    ],
    body: JSON.stringify( {username: inputs.name,
      password: inputs.password})
  };

  
  const fetchData = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_TOKEN, config);
      console.log(response.reject);
      const data = await response.json();
     
      if(response.status === 200){
        localStorage.setItem("token", data.token);
        value.returnLogin(true);
        navigate("/profilis");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return fetchData();


}