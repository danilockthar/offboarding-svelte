import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const styles = () => ({
  progress: {
    backgroundColor: '#ffffffab',
    height: '100%',
    width: '100%',
    position: 'fixed',
    zIndex: 100,
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const MainLoader = ({ classes, isLoading }) => {
  return isLoading ? (
    <div className={classes.progress}>
      <CircularProgress size={50} />
    </div>
  ) : null;
}

export default withStyles(styles)(MainLoader);
