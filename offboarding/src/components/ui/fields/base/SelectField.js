import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import get from 'lodash/get';

import __ from '../../../../i18n';
import InputHelperText from './InputHelperText';
import { useGlobalState } from '../../../../context/GlobalStateContext';
import { Box } from '@material-ui/core';

const variantMapper = {
  standard: 'standard',
  filled: 'filled',
  outlined: 'outlined',
  fixedLabelTop: 'outlined',
};

const styles = (theme) => ({
  labelVariantOutside: {
    pointerEvents: 'auto',
    transform: 'translateY(-20px) !important',
  },
  formControlForOutsideLabel: {
    marginBottom: 30,
  },
  asPlaceholder: {
    color:
      get(theme, 'palette.components.select.emptyOptionColor') ||
      theme.palette.text.primary,
  },
  textWrap: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  paperBox: {
    [theme.breakpoints.only('xs')]: {
      width: '90%',
      left: '50%',
      top: 0,
      transform: 'translate(-50%, -50%) ',
    },
  },
});

const SelectField = ({
  label,
  id,
  help,
  hideHelp,
  options,
  validate,
  showEmptyOption,
  classes,
  ...props
}) => {
  const { globalState } = useGlobalState();
  const { configurationManager } = globalState;

  const [field, meta] = useField({ ...props, validate });
  const { error, touched } = meta;
  const { name } = props;

  const variant =
    configurationManager.get('fields.common.variant') || props.variant;
  const fixedLabelTopVariant = variant === 'fixedLabelTop';

  const shrink = props.variant === 'fixedLabelTop' ? true : undefined;

  const isDefaultValue = field.value === '';

  return (
    <FormControl
      fullWidth
      error={touched && !!error}
      className={classNames({
        [classes.formControlForOutsideLabel]: fixedLabelTopVariant,
      })}
    >
      <InputLabel
        htmlFor={id || name}
        className={classNames({
          [classes.labelVariantOutside]: fixedLabelTopVariant,
        })}
        shrink={shrink}
      >
        {__(label)}
      </InputLabel>

      <Select
        data-testid={name}
        id={id || name}
        name={name}
        error={!!error && touched}
        MenuProps={{
          classes: { paper: classes.paperBox },
          disableAutoFocusItem: true,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        }}
        displayEmpty
        className={classNames({ [classes.asPlaceholder]: isDefaultValue })}
        {...field}
        {...props}
        variant={variantMapper[variant]}
      >
        {showEmptyOption && (
          <MenuItem key="" value="">
            {__(`fields.${name}.placeholder`, '')}&nbsp;
          </MenuItem>
        )}

        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Box className={classes.textWrap}>{__(option.label)}</Box>
          </MenuItem>
        ))}
      </Select>

      <InputHelperText
        error={error}
        touched={touched}
        help={help}
        hideHelp={hideHelp}
      />
    </FormControl>
  );
};

SelectField.defaultProps = {
  help: null,
  hideHelp: false,
  showEmptyOption: false,
  id: undefined,
  variant: 'standard',
  label: '',
};

SelectField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  help: PropTypes.string,
  hideHelp: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]).isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  showEmptyOption: PropTypes.bool,
  variant: PropTypes.oneOf(['standard', 'filled', 'outlined', 'fixedLabelTop']),
  classes: PropTypes.shape({
    formControlForOutsideLabel: PropTypes.string.isRequired,
    labelVariantOutside: PropTypes.string.isRequired,
    asPlaceholder: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(SelectField);
