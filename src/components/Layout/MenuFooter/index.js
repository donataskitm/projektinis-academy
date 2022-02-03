import React from 'react';
import { Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import "./style.css";

function MenuItem(props) {

  return (
    <Nav.Item  className="px-3">
      <Link to={props.url}  key={props} className="link">{props.name}</Link>
    </Nav.Item>
  );
}

MenuItem.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
};
MenuItem.defaultProps = {
  url: '',
  name: '',
};

export default MenuItem;