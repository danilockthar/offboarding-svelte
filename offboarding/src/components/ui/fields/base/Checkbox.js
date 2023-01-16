import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import { useField } from 'formik';

import __ from "../../../../i18n";
import CheckboxSquare from '../../../icons/Checkbox';
import InputHelperText from './InputHelperText';

const styles = () => ({
  root: {
    position: 'relative',
    height: 'auto',
    minHeight: 72,
  },
  helper: {
    paddingLeft: 30,
    bottom: -5,
    left: 34,
  },
  helperChecked: {
    paddingLeft: 30,
    bottom: -15,
    left: 34,
    whiteSpace: 'nowrap',
  },
  disabled: {
    opacity: 0.5,
  }
});

const CheckboxField = ({
  label,
  help,
  helpChecked,
  classes,
  icon,
  checkedIcon,
  validate,
  ...props
}) => {
  const [field, meta] = useField({...props, validate});
  const { error, touched } = meta;
  const { value } = field;

  const isChecked = value && value !== 'false';

  return (
    <FormControl error={!!error} className={classes.root} {...props}>
      <FormControlLabel
        className={props.disabled ? classes.disabled : ''}
        checked={isChecked}
        label={label === String(label) ? __(label) : label}
        data-testid={`${props.name}-label`}
        control={(
          <Checkbox
            data-testid={props.name}
            icon={icon}
            checkedIcon={checkedIcon}
          />
        )}
        {...field}
      />

      <InputHelperText className={classes.helper} error={error} touched={touched} help={help} hideHelp={!isChecked && !!helpChecked} />
      <InputHelperText className={classes.helperChecked} help={helpChecked} hideHelp={!isChecked} />
    </FormControl>
  );
};

CheckboxField.defaultProps = {
  label: '',
  icon: <CheckboxSquare />,
  checkedIcon: <CheckboxSquare selected />,
  help: null,
  helpChecked: null,
  classes: {},
  disabled: false,
};

CheckboxField.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  help: PropTypes.string,
  helpChecked: PropTypes.string,
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    helper: PropTypes.string.isRequired,
    helperChecked: PropTypes.string.isRequired,
    disabled: PropTypes.string.isRequired,
  }),
  icon: PropTypes.element,
  checkedIcon: PropTypes.element,
  disabled: PropTypes.bool,
};

export default withStyles(styles)(CheckboxField);
