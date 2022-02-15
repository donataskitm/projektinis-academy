import PropTypes from 'prop-types';

const ErrorMessage = ({message, color}) => {
  return (
    message ? <p className={color}>{message}</p> : null
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  color: PropTypes.string,
};

ErrorMessage.defaultProps = {
  message: "",
  color: "text-danger"
};

export default ErrorMessage;