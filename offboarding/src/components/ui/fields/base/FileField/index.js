import React from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames';
import get from 'lodash/get';
import { isFunction, useField, useFormikContext } from 'formik';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import API from '../../../../../api';
import __ from '../../../../../i18n';
import { useGlobalState } from '../../../../../context/GlobalStateContext';
import RenderField from './RenderField';

const styles = (theme) => ({
  root: {
    fontFamily: get(theme, 'typography.fontFamily'),
    backgroundColor:
      get(theme, 'palette.components.file.backgroundFull') ||
      get(theme, 'palette.primary.lightGray'),
    border: `solid 1px ${theme.palette.primary.gray}`,
    borderRadius: 8,
    padding: '10px 16px',
    margin: get(theme, 'palette.components.file.marginItem') || 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'left',
    fontWeight: 'Normal',
    fontSize: 14,
    cursor: 'pointer',
    color: '#999999',
    /* height: 56, */
    overflow: 'visible',
    position: 'relative',
    '& b': {
      color: '#666666',
    },
    '& img': {
      marginRight: 12,
      width: get(theme, 'palette.components.file.img.width') || 16,
    },
    '& label': {
      color: theme.palette.primary.main,
      fontSize: 17,
      fontWeight: 600,
    },
    '& p': {
      margin: '0px !important',
      zIndex: 1,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      width: '85%',
    },
    '& button': {
      cursor: 'pointer',
      background: 'transparent',
      border: 0,
      position: 'absolute',
      zIndex: 2,
      right: 8,
      '& img': {
        margin: 0,
      },
    },
  },
  error: {
    border: `solid 1px ${theme.palette.primary.danger}`,
    '& + p': {
      color: theme.palette.primary.danger,
    },
  },
  outline: {
    border: `solid 1px ${
      get(theme, 'palette.components.file.borderFull') ||
      get(theme, 'palette.secondary.main')
    }`,
  },
  uploaded: {
    backgroundColor:
      get(theme, 'palette.components.file.backgroundFull') ||
      get(theme, 'palette.secondary.main'),
    color:
      get(theme, 'palette.components.file.colorFull') ||
      get(theme, 'palette.text.light'),
    '& b': {
      color:
        get(theme, 'palette.components.file.colorFull') ||
        get(theme, 'palette.text.light'),
    },
  },
});

const Index = ({
  endpoint,
  name,
  headers,
  label,
  help,
  description,
  classes,
  accept,
  maxSize,
  validate,
  formDataParams,
  CustomRender,
  onFileUpload,
  id,
}) => {
  const { globalState } = useGlobalState();
  const { values } = useFormikContext();
  const [field, meta, helpers] = useField({
    type: 'file',
    name,
    label,
    validate,
  });
  const [file, setFile] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [error, setError] = React.useState(undefined);
  const fieldError = meta.touched ? meta.error ?? false : false;
  const isUploaded = !!values[name];

  const { configurationManager } = globalState;

  const reset = () => {
    setFile(null);
    setProgress(0);
    setError(undefined);

    helpers.setValue(undefined);
    helpers.setError(undefined);
  };

  const propsForRenderComponent = {
    isUploaded,
    progress,
    file,
    reset,
    help,
    description,
    label,
    classes,
    values,
    name,
  };

  const baseFormData = (fileToUpload) => {
    const formData = new FormData();
    formData.append(name, fileToUpload);
    return formData;
  };

  const sendFile = (fileToUpload) => {
    const customFormData = configurationManager.get(
      'fields.common.file.formData',
    );
    const data = isFunction(customFormData)
      ? customFormData(fileToUpload, formDataParams)
      : baseFormData(fileToUpload);

    API(configurationManager.get('API_DOMAIN'))({
      method: 'POST',
      url: endpoint,
      data,
      headers,
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        setProgress(percentCompleted);
      },
    })
      .then(() => {
        setProgress(100);
        helpers.setValue(fileToUpload.name || fileToUpload.path);
        helpers.setTouched(true);
        if (onFileUpload) {
          onFileUpload(name, fileToUpload.name || fileToUpload.path);
        }
      })
      .catch(() => {
        reset();
        setError(__('file.errors.default'));
      });
  };

  const onDrop = (acceptedFiles) => {
    setError(undefined);
    if (acceptedFiles.length) {
      setFile(acceptedFiles[0]);

      const reader = new FileReader();
      reader.onload = () => {
        sendFile(acceptedFiles[0]);
      };

      reader.onabort = () => {
        reset();
        setError(__('file.errors.default'));
      };

      reader.onerror = () => {
        reset();
        setError(__('file.errors.default'));
      };

      reader.readAsBinaryString(acceptedFiles[0]);
    }
  };

  const onDropRejected = (errorRejected) => {
    reset();
    setError(
      __(
        `file.errors.${errorRejected[0]?.errors[0]?.code}`,
        __('file.errors.default'),
      ),
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
    field: name,
    accept,
    maxSize,
    disableClick: !!field.value,
  });

  return (
    <FormControl
      style={{ width: '100%', height: 'fit-content' }}
      error={!!error}
      id={id}
    >
      <div
        {...getRootProps()}
        className={classNames(classes.root, {
          [classes.error]: !!error || !!fieldError,
          [classes.outline]: !error && !fieldError && (file || isUploaded),
          [classes.uploaded]: progress > 90 || isUploaded,
        })}
      >
        <input {...getInputProps()} name={name} data-testid={name} />

        {CustomRender ? (
          React.createElement(CustomRender, propsForRenderComponent)
        ) : (
          <RenderField {...propsForRenderComponent} />
        )}
      </div>

      {error && <FormHelperText>{error}</FormHelperText>}
      {!error && !!meta.error && <FormHelperText>{meta.error}</FormHelperText>}
    </FormControl>
  );
};

Index.defaultProps = {
  name: 'attachment',
  accept: 'image/jpeg, image/png, application/pdf, application/x-pdf',
  maxSize: 10485760, // 10MB
  classes: {},
  label: null,
  help: 'file.help.label',
  description: '',
  headers: { 'Content-Type': 'multipart/form-data' },
  validate: null,
  formDataParams: {},
  CustomRender: null,
};

Index.propTypes = {
  endpoint: PropTypes.string.isRequired,
  name: PropTypes.string,
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    outline: PropTypes.string.isRequired,
    uploaded: PropTypes.string.isRequired,
  }),
  label: PropTypes.string,
  help: PropTypes.string,
  accept: PropTypes.string,
  maxSize: PropTypes.number,
  description: PropTypes.string,
  headers: PropTypes.shape({}),
  validate: PropTypes.func,
  formDataParams: PropTypes.shape({}),
  CustomRender: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
};

export default withStyles(styles)(Index);
