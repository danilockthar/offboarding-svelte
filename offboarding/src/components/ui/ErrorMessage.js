import React from 'react';
import PropTypes from 'prop-types';

import Alert from './Alert';
import __ from '../../i18n';

const ErrorMessage = ({ error }) => {
  return error ? (
    <Alert type="error" data-testid="error-message">
      {__(error)}
    </Alert>
  ) : null;
};

ErrorMessage.defaultProps = {
  error: '',
};

ErrorMessage.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
}

export default ErrorMessage;
