import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const SignIn = ({ children }) => {
  if (window.localStorage.getItem('token')) {
    return children;
  }

  return <Navigate to="/prisijungimas" />;
};

export default SignIn;

SignIn.propTypes = {
  children: PropTypes.node.isRequired
};
