import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CheckboxSquare from './Checkbox';

const styles = (theme) => ({
  root: {
    borderRadius: 56 / 2,
    border: `1px solid ${theme.palette.primary.main}`,
  },
  selected: {
    color: theme.palette.text.light,
    backgroundColor: theme.palette.primary.main + '! important',
  },
});

export default withStyles(styles)(CheckboxSquare);
