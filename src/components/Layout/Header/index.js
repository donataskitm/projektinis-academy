import React from 'react';
import { Row, Navbar, Tooltip, OverlayTrigger} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import "./style.css";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../../Button';
import { HeaderContext} from '../../../contexts/context';
import Column from './Column';
import NavBar from './NavBar';

function Header(props) {

  const value = React.useContext(HeaderContext);  

  const navigate = useNavigate();
  const apiLink = process.env.REACT_APP_API_ALL_POSTS;

  const onClick = (link) => {
    navigate(link, { state: {apiLink: apiLink } });
  };

  const onLogout = (link) => {
    navigate(link, { state: {apiLink: apiLink } });
    window.localStorage.removeItem("token");
    value.returnLogin(false);
  };

  const renderTooltip = (settings) => (
    <Tooltip className="tooltip-inner" id="tooltip-inner" {...settings}>
      Sąmata
    </Tooltip>
  );

  return (
    <Row className="row logo-title gx-0 bg-success text-warning justify-content-center flex-row part-header">
      <Column md={6}>
        <Link to='/'>
          <img
            src="/pic/logo.png"
            className='p-1 img-fluid hover-shadow'
            alt='samata'
            width="70px"/>
        </Link>
        <NavBar>
          <Navbar.Brand className="menu-pointer" onClick={() => onClick("/")}>
              KOKS AUGALAS
          </Navbar.Brand>
        </NavBar >
      </Column>
      <Column md={2}>
        <Link to='/atranka'>
          <img
            src="/pic/search.png"
            className='img-fluid estimate-img'
            alt='search'
            width="30px"/>
        </Link>
        <NavBar>
          <Navbar.Brand className="menu-pointer" onClick={() => onClick("/atranka")}>
             Paieška
          </Navbar.Brand>
        </NavBar>
      </Column>
      {
        props.login===props.isLogged ? 
          <>
            <Column md={1}>
              <Button
                name="Prisijungti"
                color="warning"
                onClick={() => onClick("/prisijungimas")} /> 
            </Column>
            <Column md={1}>
              <Button
                name="Registruotis"
                color="danger"
                onClick={() => onClick("/registracija")} /> 
            </Column></>
          :
          <>
            <Column md={1}>
              <Button
                name="Atsijungti"
                color="danger"
                onClick={() => onLogout("/")} /> 
            </Column>
            <Column md={1}>
              <Button
                name="Profilis"
                color="warning"
                onClick={() => onClick("/profilis")} /> 
            </Column>
          </>
      }

      <Column md={2}>
        <div >
          <OverlayTrigger
            placement="left"
            delay={{ show: 150, hide: 200 }}
            overlay={renderTooltip}>
            <Link to='/samata'>
              <img
                src="/pic/estimate.png"
                className='img-fluid hover-shadow'
                alt='samata'
                width="25px"/>
            </Link>
          </OverlayTrigger>
        </div> 
        <div >
          <h5 className="m-1 text-white"> {props.number}</h5>
        </div>
      </Column>
    </Row>
  );
}

Header.propTypes = {
  number: PropTypes.number.isRequired,
  login: PropTypes.bool,
  isLogged: PropTypes.bool,
};

Header.defaultProps = {
  login: false,
  isLogged: false,
};
export default Header;

