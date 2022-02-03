import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SearchBar from '../../components/SearchBar';
import Plants from '../../components/Plants';
import "./style.css";

function Home() {

  return (

    <Row className="home">
      <Col sm={12} className="title-padding text-center text-white ">
        <h3>Parink dekoratyvinius žolinius augalus savo svajonių želdynui</h3>
      </Col>
      <Col sm={12}>
        <SearchBar placeholder="Įvesk augalo vardą" />
      </Col>
      <Col sm={12} className="title-padding pb-0">
        <Plants />
      </Col>
    </Row>
  );
}

export default Home;