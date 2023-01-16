import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { withStyles } from '@material-ui/core/styles';

import classNames from 'classnames';
import __ from '../../../../i18n';
import InputHelperText from './InputHelperText';
import { useGlobalState } from '../../../../context/GlobalStateContext';

const inputStyles = {
  standard: Input,
  filled: FilledInput,
  outlined: OutlinedInput,
  fixedLabelTop: OutlinedInput,
};

const variantMapper = {
  standard: 'standard',
  filled: 'filled',
  outlined: 'outlined',
  fixedLabelTop: 'outlined',
};

const styles = () => ({
  labelVariantOutside: {
    pointerEvents: 'auto',
    transform: 'translateY(-20px) !important',
  },
  formControlForOutsideLabel: {
    marginBottom: 20,
  },
});

const TextField = ({
  label,
  fullWidth,
  id,
  help,
  hideHelp,
  validate,
  disabledInputProps,
  classNameFormControl,
  classes,
  ...props
}) => {
  const { globalState } = useGlobalState();
  const { configurationManager } = globalState;

  const [field, meta] = useField({ ...props, validate });
  const { error, touched } = meta;

  const { name, type, disabledStyle = false } = props;

  const variant =
    configurationManager.get('fields.common.variant') || props.variant;
  const fixedLabelTopVariant = variant === 'fixedLabelTop';

  const shrink = type === 'date' || fixedLabelTopVariant ? true : undefined;

  const InputComponent = inputStyles[variant];

  return (
    <FormControl
      fullWidth={fullWidth}
      error={!disabledInputProps && touched && !!error}
      variant={variantMapper[variant]}
      className={classNames(classNameFormControl, {
        [classes.formControlForOutsideLabel]: fixedLabelTopVariant,
      })}
    >
      <InputLabel
        className={classNames({
          [classes.labelVariantOutside]: fixedLabelTopVariant,
        })}
        style={
          disabledStyle
            ? {
                color: '#B2B2B2',
                WebkitTransform: 'translateZ(0px)',
                WebkitTextFillColor: '#B2B2B2',
              }
            : null
        }
        htmlFor={id || name}
        shrink={shrink}
      >
        {__(label)}
      </InputLabel>
      <InputComponent
        data-testid={name}
        {...field}
        {...props}
        placeholder={__(`fields.${name}.placeholder`, '')}
        id={id || name}
        style={
          disabledStyle
            ? {
                color: '#B2B2B2',
                WebkitTransform: 'translateZ(0px)',
                WebkitTextFillColor: '#B2B2B2',
              }
            : null
        }
      />

      <InputHelperText
        error={!disabledInputProps && error}
        touched={touched}
        help={help}
        hideHelp={hideHelp}
      />
    </FormControl>
  );
};

TextField.defaultProps = {
  label: null,
  fullWidth: true,
  validate: () => {},
  help: null,
  hideHelp: false,
  id: null,
  variant: 'standard',
  classNameFormControl: null,
};

TextField.propTypes = {
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
  id: PropTypes.string,
  help: PropTypes.string,
  hideHelp: PropTypes.bool,
  validate: PropTypes.func,
  variant: PropTypes.oneOf(['standard', 'filled', 'outlined', 'fixedLabelTop']),
  classNameFormControl: PropTypes.string,
};

export default withStyles(styles)(TextField);
