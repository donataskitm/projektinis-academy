import React from 'react';
import {Col} from 'react-bootstrap';
import PropTypes from 'prop-types';

function Column({md, children}) {

  return (
    <Col
      xs={12}
      md={md}
      className="d-flex align-items-center justify-content-center">
      {children}
    </Col>
  );
}

Column.propTypes = {
  md: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
};

export default Column;