import React from 'react';
import classNames from 'classnames';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    backgroundColor: 'white',
    width: 24,
    height: 24,
    borderRadius: 3,
    border: `1px solid ${theme.palette.primary.gray}`,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& $icon': {
      opacity: 0,
    },
  },
  selected: {
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.primary.main}`,
    '& $icon': {
      opacity: 1,
    },
  },
  icon: {
    paddingTop: 1,
    width: 20,
  },
});

const CheckboxIcon = ({ classes, selected = false }) => (
  <div
    className={classNames({
      [classes.root]: true,
      [classes.selected]: selected,
    })}
  >
    <SvgIcon className={classes.icon}>
      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
    </SvgIcon>
  </div>
);

export default withStyles(styles)(CheckboxIcon);
