import React from 'react';
import classNames from 'classnames';
import get from 'lodash/get';
import withStyles from '@material-ui/core/styles/withStyles';

import __ from '../../../../../i18n';
import ImgWithPath from '../../../ImgWithPath';

const styles = (theme) => ({
  root: {},
  error: {},
  outline: {},
  uploaded: {},
  progress: {
    backgroundColor:
      get(theme, 'palette.components.file.backgroundFull') ||
      get(theme, 'palette.secondary.main'),
    pointerEvents: 'none',
    opacity: ' 0.3',
    position: 'absolute',
    height: '100%',
    width: '50%',
    left: 0,
    transition: '0.5s',
  },
});

const RenderField = ({
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
}) => {
  if (!isUploaded && !file) {
    const formattedDescription =
      help && description ? ` - ${__(description)}` : __(description);

    return (
      <>
        <ImgWithPath src="icons/paperclip.svg" alt="help" />
        <p>
          <b>{__(label)}</b>
          <br />
          {__(help)}{' '}
          {isUploaded ? <b>{__('common.uploaded')}</b> : formattedDescription}
        </p>
      </>
    );
  }

  return (
    <>
      {progress < 90 && (
        <label htmlFor={name}>
          {__('common.uploading')} {progress}
          %...
        </label>
      )}

      {progress >= 90 && (
        <p>
          <b>{__(label)}</b>
          <br />
          {`${(file && file.name) || values[name]} ${file?.size ? `(${parseInt(file.size / 1024, 10)}k)` : ''
            }`}
        </p>
      )}

      <button type="button" onClick={reset}>
        <ImgWithPath src="icons/cancel.svg" alt="cancel" />
      </button>

      <div
        className={classNames(classes.progress)}
        style={{ width: `${progress}%` }}
      />
    </>
  );
};

export default withStyles(styles)(RenderField);
