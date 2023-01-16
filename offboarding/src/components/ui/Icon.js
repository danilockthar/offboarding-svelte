import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles/index';
import ImgWithPath from "./ImgWithPath";

const styles = (theme) => ({
  root: {
    display: 'inherit',
  },
  image: {
    width: 'auto',
    height: 24,
    transition: theme.transitions.create(
      ['filter', 'opacity', 'width', 'height'],
      {
        duration: theme.transitions.duration.shortest,
      },
    ),
  },
  alignCenter: {
    textAlign: 'center',
  },
  alignRight: {
    textAlign: 'right',
  },
  disabled: {
    '& $image': {
      opacity: 0.8,
      filter: 'grayscale(1) brightness(2) contrast(2)',
    },
  },
});

const Icon = ({ classes, size, align, disabled, className, ...rest }) => (
  <div
    style={{ height: size, width: size }}
    className={classNames(classes.root, {
        [classes.alignCenter]: align === 'center',
        [classes.alignRight]: align === 'right',
        [classes.disabled]: disabled,
      })}
  >
    <ImgWithPath
      alt="icono"
      onDragStart={(e) => e.preventDefault()}
      className={classNames(classes.image, className)}
      style={size ? { height: size, width: size } : undefined}
      {...rest}
    />
  </div>
  );

Icon.defaultProps = {
  align: '',
  disabled: false,
  className: '',
  size: 30,
};

Icon.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    alignCenter: PropTypes.string.isRequired,
    alignRight: PropTypes.string.isRequired,
    disabled: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  size: PropTypes.number,
  align: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default withStyles(styles)(Icon);
