import React from 'react';
import PropTypes from 'prop-types';
import {useMediaQuery, useTheme, withStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";

import TextField from "./fields/base/TextField";
import { validations } from "../../helpers/validate";
import __ from '../../i18n';

const styles = (theme) => ({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    width: '100%',
    minHeight: '92px',
    borderRadius: '8px',
    backgroundColor: theme.palette.primary.light,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0px 32px',
    [theme.breakpoints.only('xs')]: {
      padding: '10px 32px',
    },
  },
  field: {
    backgroundColor: 'white',
    height: 56,
    width: 154,
    '& $input': {
      textAlign: 'center',
      color: theme.palette.text.primary,
      fontSize: 24,
      fontWeight: 'bold',
    },
  },
  formControl: {
    height: 56,
  },
  spacer: {
    marginTop: 50,
    [theme.breakpoints.only('xs')]: {
      marginTop: 125,
    },
  }
});

const BarSellerCode = ({ classes }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));

  return (
    <>
      <div className={classes.container}>
        <Grid container alignItems="center" justify={isMobile ? 'center' : 'flex-end'}>
          <Grid item>
            <Typography variant="h4">{__('fields.sellerCode.label')}</Typography>
          </Grid>

          <Grid item>
            <TextField
              fullWidth={false}
              className={classes.field}
              classNameFormControl={classes.formControl}
              variant="outlined"
              name="sellerCode"
              validate={validations({ required: 1 })}
            />
          </Grid>
        </Grid>
      </div>
      <div className={classes.spacer} />
    </>
  );
}

BarSellerCode.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    spacer: PropTypes.string.isRequired,
    formControl: PropTypes.string.isRequired,
  }).isRequired,
}

export default withStyles(styles)(BarSellerCode);
