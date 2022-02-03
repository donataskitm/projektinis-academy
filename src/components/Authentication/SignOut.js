import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const SignOut = ({ children }) => {
  if (!window.localStorage.getItem('token')) {
    return children;
  }

  return <Navigate to="/profilis" />;
};

export default SignOut;

SignOut.propTypes = {
  children: PropTypes.node.isRequired
};
