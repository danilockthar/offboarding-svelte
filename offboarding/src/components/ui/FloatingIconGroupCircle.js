import React          from 'react';
import classNames     from 'classnames';
import { withStyles } from '@material-ui/core/styles/index';
import Grid           from '@material-ui/core/Grid/index';
import PropTypes from 'prop-types';

import Icon from "./Icon";

const styles = theme => ({
  root: {

  },
  item: {
    height: 64,
    width: 64,
    margin: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    height: 64,
    width: 64,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    boxShadow: '0 2px 8px 0 rgba(0,0,0,0.2)',
    backgroundColor: 'white',
    transition: theme.transitions.create(['width', 'height', 'transform'], {
      duration: theme.transitions.duration.shorter,
    }),
    transform: 'scale(0.75)',
    userSelect: 'none',
  },
  icon: {
    height: 32,
    userSelect: 'none',
  },
  active: {
    transform: 'scale(1)',
  },
});

const FloatingIconGroup = ({ classes, icons, selected, onSelect, className, gridConfig }) => {
  return (
    <Grid
      container
      spacing={0}
      justify={gridConfig.justify}
      alignItems={gridConfig.alignItems}
      className={classNames(classes.root, className)}
    >
      {icons && icons.map((icon, index) => (
        <Grid item key={index} className={classes.item}>
          <div className={classNames(classes.circle, {
            [classes.active]: selected === index,
          })}
          >
            <Icon
              className={classes.icon}
              onClick={() => onSelect && onSelect(index)}
              disabled={selected !== index}
              src={icon}
            />
          </div>
        </Grid>
      ))}
    </Grid>
  );
}

FloatingIconGroup.defaultProps = {
  onSelect: () => {},
  className: '',
  gridConfig: {
    justify: 'center',
    alignItems: 'center',
  },
};

FloatingIconGroup.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    item: PropTypes.string.isRequired,
    circle: PropTypes.string.isRequired,
    active: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  icons: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.number.isRequired,
  onSelect: PropTypes.func,
  className: PropTypes.string,
  gridConfig: PropTypes.shape({
    justify: PropTypes.string,
    alignItems: PropTypes.string,
  }),
};

export default withStyles(styles)(FloatingIconGroup);
