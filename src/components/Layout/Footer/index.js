import React from 'react';
import { Nav, Navbar, Col, Row } from 'react-bootstrap';
import MenuItem from '../MenuFooter';
import menuData from '../../../data/footerMenuData';
import './style.css';

function Footer() {

  return (
    <Row className="d-flex gx-0 flex-wrap flex-row justify-content-center text-center">
      <Col xs={12} className="footer-top"></Col>
      <Col xs={12} className="row part-footer bg-dark text-white ">
        <Navbar bg="none" className="navbar-dark  align-items-center justify-content-center ">
          <Nav className="flex-column flex-sm-row" >
            {menuData.map((info, index) => (<MenuItem key={index} {...info} />
            ))}
          </Nav>
        </Navbar>
      </Col>
    </Row>
  );
}

export default Footer;