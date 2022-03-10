import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SearchBar from '../../components/SearchBar';
import Plants from '../../components/Plants';
import "./style.css";

function Home() {

  return (
    <Row className="gx-0">
      <Col sm={12} className="home home-background">
        <Row className="gx-0">
          <Col >
            <Row className="gx-0">
              <Col sm={12} className="text-center text-white pb-5">
                <h3>Parink dekoratyvinius žolinius augalus savo svajonių želdynui</h3>
              </Col>
              <Col xs="9" md="6" lg="5" sm="8" className="py-5 m-auto">
                <SearchBar placeholder="Įvesk augalo vardą" errorColor="text-white"/>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row className="gx-0">
          <Col sm={12}>
            <Plants />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Home;