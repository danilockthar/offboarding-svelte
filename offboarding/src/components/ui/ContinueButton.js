import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFormikContext } from 'formik';
import { useNavigation } from '@geopagos/react-oz-wizard';
import { useGlobalState } from '../../context/GlobalStateContext'
import __ from '../../i18n';

const useStyles = makeStyles(() => ({
  continueButton: {
    width: 'auto',
    minWidth: (props) => (props.fullWidth ? '100%' : '0'),
  },
}));

const ContinueButton = ({ fullWidth = false, disabled }) => {
  const classes = useStyles({ fullWidth });
  const { globalState } = useGlobalState();
  const { dirty, isValid } = useFormikContext();
  const { currentStepKey } = useNavigation();
  const stepWasPreviouslyCompleted = Boolean(globalState?.stepsCompleted?.[currentStepKey]);

  const isDisabled = stepWasPreviouslyCompleted ? !isValid : !dirty || !isValid

  return (
    <Button
      className={classes.continueButton}
      disabled={disabled ?? isDisabled}
      variant="outlined"
      type="submit"
      data-testid="continue"
    >
      {__('common.continue')}
    </Button>
  );
};

ContinueButton.propTypes = {
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default ContinueButton;
