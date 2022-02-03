import React from 'react';
import {Row, Col} from 'react-bootstrap';

function Dashboard() {
  fetchToken();
  return (
    <Row>
      <Col sm={12} className="text-center text-secondary">
        <h4 className="p-5">Vartotojo profilis</h4> 
        <p>Sąmatos ir vartotojo info</p>
      </Col>
    </Row>
  );
}

export default Dashboard;

//TODO: to use clean code principle
function fetchToken() {

  let config = {
    method: "POST",
    headers: [
      ["Content-Type", "application/json"],
      ["Content-Type", "text/plain"],
      ["Authorization", `Bearer ${localStorage.getItem('token')}`]
    ],
  };

  const fetchData = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_VALID_TOKEN, config);
      console.log(response.reject);
      const data = await response.json();
     
      if(response.status === 200){
        console.log(JSON.stringify(data)+"ok");
        
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return fetchData();


}