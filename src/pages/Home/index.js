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
              <Col sm={12} className="text-center text-white ">
                <h3>Parink dekoratyvinius žolinius augalus savo svajonių želdynui</h3>
              </Col>
              <Col sm={12}>
                <SearchBar placeholder="Įvesk augalo vardą" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col sm={12}>
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