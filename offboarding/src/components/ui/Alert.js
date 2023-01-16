import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { withStyles } from '@material-ui/core/styles/index';

const styles = (theme) => ({
  primary: {
    backgroundColor: get(theme, 'palette.primary.light'),
    color: get(theme, 'palette.primary.main'),
    fontFamily:
      get(theme, 'typography.fontFamily') || 'URWGeometric, sans-serif',
    fontSize: 14,
    textAlign: 'left',
    borderRadius: 8,
    padding: 15,
    margin: '16px 0',
    width: '100%',
  },
  success: {
    backgroundColor: '#EDF7ED',
    color: get(theme, 'palette.secondary.green') || '#1E4620',
    fontFamily:
      get(theme, 'typography.fontFamily') || 'URWGeometric, sans-serif',
    fontSize: 16,
    fontWeight: 600,
    textAlign: 'center',
    borderRadius: 8,
    padding: 15,
    margin: '16px 0',
    width: '100%',
  },
  error: {
    backgroundColor: '#E34B561A',
    color: get(theme, 'palette.secondary.red') || '#E34B56',
    fontFamily:
      get(theme, 'typography.fontFamily') || 'URWGeometric, sans-serif',
    fontSize: 16,
    fontWeight: 600,
    textAlign: 'center',
    borderRadius: 8,
    padding: 15,
    margin: '16px 0',
    width: '100%',
  },
});

const Alert = ({ type, children, classes, ...rest }) => (
  <div className={classes[type]} {...rest} data-testid={type}>
    {children}
  </div>
);

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  classes: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
};

Alert.defaultProps = {
  classes: {},
};

export default withStyles(styles)(Alert);
