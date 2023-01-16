import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import IconSvg from '@material-ui/core/Icon';
import IconImg from './Icon';

const styles = (theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-end'
    },
  },
  item: {
    height: 10,
    width: 10,
    margin: '0 10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    backgroundColor: get(theme, 'palette.components.stepProgressGroupCircle.circleColor') || get(theme, 'palette.primary.mediumGray') || 'gray',
    transition: theme.transitions.create(['width', 'height', 'transform'], {
      duration: theme.transitions.duration.shorter,
    }),
    userSelect: 'none',
    '&.active': {
      backgroundColor: 'red',
    },
  },
  icon: {
    height: 32,
    userSelect: 'none',
  },
  active: {
    backgroundColor: get(theme, 'palette.components.stepProgressGroupCircle.circleActiveColor') || get(theme, 'palette.primary.darkGray') || 'black',
  },
  lastStep: {
    backgroundColor: 'transparent'
  }
});

const StepProgressGroupCircle = ({
  classes,
  icons,
  selected,
  onSelect,
  className,
  gridConfig,
  progressive,
}) => (
  <Grid
    container
    spacing={0}
    justify={gridConfig.justify}
    alignItems={gridConfig.alignItems}
    className={classNames(classes.root, className)}
  >
    {icons &&
      icons.map((icon, index) => {
        const progressiveActive = !progressive ? false : index < selected;
        const IconComponent = typeof icon === 'string' ? IconImg : IconSvg;
        const srcKey = typeof icon === 'string' ? 'src' : 'component';
        return (
          <Grid item key={index} className={classes.item}>
            <div
              className={classNames(classes.circle, {
                [classes.active]:
                  selected === index || progressiveActive,
                [classes.lastStep]:
                  icon && selected === index && selected === icons.length - 1,
              })}
            >
              {icon && selected === icons.length - 1 && index === selected && (
                <IconComponent
                  className={classes.icon}
                  onClick={() => onSelect && onSelect(index)}
                  disabled={selected !== index}
                  color="primary"
                  {...{[srcKey]: icon}}
                />
              )}
            </div>
          </Grid>
        )
      })}
  </Grid>
);

StepProgressGroupCircle.defaultProps = {
  onSelect: () => {},
  className: '',
  gridConfig: {
    justify: 'center',
    alignItems: 'center',
  },
  progressive: false,
};

StepProgressGroupCircle.propTypes = {
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
  progressive: PropTypes.bool,
};

export default withStyles(styles)(StepProgressGroupCircle);
