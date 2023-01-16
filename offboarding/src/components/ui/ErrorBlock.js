import React from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from "./ErrorMessage";

const ErrorBlock = ({ error }) => {
  if(!error) return null;

  if(!Array.isArray(error)) {
    return <ErrorMessage error={error} />
  }

  return error.map((message, index) => <ErrorMessage key={index} error={message} />)
};

ErrorBlock.defaultProps = {
  error: '',
};

ErrorBlock.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.string),
  ]),
}

export default ErrorBlock;
