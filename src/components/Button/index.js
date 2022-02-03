import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Button(props) {


  return (
    <div className="text-center">
      <BootstrapButton
        variant={props.color}
        type="submit"
        onClick={() => props.function()}>{props.name}</BootstrapButton>
    </div>
  );
}

Button.propTypes = {
  color: PropTypes.string.isRequired,
  function: PropTypes.func,
  name: PropTypes.string.isRequired
};

Button.defaultProps = {
  function: ()=>{}
};

export default Button;

