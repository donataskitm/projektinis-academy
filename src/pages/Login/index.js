import React, {useState} from 'react';
import { Form, Row, Col} from 'react-bootstrap';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { HeaderContext } from '../../contexts/context';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [login, setLogin] = useState({
    name: '',
    password: '',
  });

  const value = React.useContext(HeaderContext);  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    fetchToken(setLogin, login, value, navigate);
  };

  return (
    <Row className="text-center">
      <h4 className="p-5"> PRISIJUNGTI</h4>
      <Form className="m-auto w-100" onSubmit={onSubmit}>
        <Row className="g-2 pb-2">
          <Col md>
            <Input
              type="name"
              placeholder="Vardas"
              name="name"
              value={login.name}
              label="Vartotojo vardas"
              onChange={handleChange} required />
          </Col>
          <Col md>
            <Input
              type="password"
              placeholder="Slaptažodis"
              name="password"
              value={login.password}
              label="Slaptažodis"
              onChange={handleChange} required />
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
function fetchToken(setLogin, login, value, navigate) {

  let config = {
    method: "POST",
    headers: [
      ["Content-Type", "application/json"],
      ["Content-Type", "text/plain"]
    ],
    body: JSON.stringify( {username: login.name,
      password: login.password})
  };

  
  const fetchData = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_TOKEN, config);
      console.log(response.reject);
      const data = await response.json();
     
      if(response.status === 200){
        localStorage.setItem("token", data.token);
        setLogin ({name: '', password: ''});
        value.returnLogin(true);
        navigate("/profilis");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return fetchData();


}