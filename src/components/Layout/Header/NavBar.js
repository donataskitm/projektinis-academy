import React from 'react';
import {Navbar, Container} from 'react-bootstrap';
import PropTypes from 'prop-types';

function NavBar({children}) {

  return (
    <Navbar bg="none" variant="dark">
      <Container >
        <Navbar.Brand>
          {children}
        </Navbar.Brand>
      </Container>
    </Navbar >
  );
}

NavBar.propTypes = {
  children: PropTypes.node.isRequired
};

export default NavBar;