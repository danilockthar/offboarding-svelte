import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import get from 'lodash/get';
import classNames from 'classnames';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    borderRadius: 8,
    padding: 24,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    lineHeight: 'auto',
    '& p': {},
    '& a': {
      marginTop: 10,
    },
    '@media(min-width: 768px)': {
      textAlign: 'left',
      flexDirection: 'row',
      '& img': {
        marginRight: 34,
      },
      '& p': {
        width: '50%',
      },
      '& a': {
        margin: 0,
      },
    },
    '& button': {
      padding: 0,
      border: 0,
      fontWeight: 600,
      fontSize: 17,
      background: 'transparent',
      color: theme.palette.primary.main,
      fontFamily:
        get(theme, 'typography.fontFamily') || 'URWGeometric, sans-serif',
      textAlign: 'right',
      outline: '0 !important',
    },
  },
  withBorder: {
    border: `solid 1px ${
      get(theme, 'palette.components.filledBox.borderColor') ||
      theme.palette.primary.main
    }`,
  },
  asColumns: {
    display: 'flex',
  },
});

const FilledBox = ({ classes, children, withBorder, asColumns, ...rest }) => {
  return (
    <div
      className={classNames(classes.root, {
        [classes.withBorder]: !!withBorder,
        [classes.asColumns]: !!asColumns,
      })}
      {...rest}
    >
      {children}
    </div>
  );
};

FilledBox.defaultProps = {
  withBorder: false,
  asColumns: true,
};

FilledBox.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    withBorder: PropTypes.string.isRequired,
    asColumns: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  withBorder: PropTypes.bool,
  asColumns: PropTypes.bool,
};

export default withStyles(styles)(FilledBox);
