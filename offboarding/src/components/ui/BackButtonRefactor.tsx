import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useNavigation } from '@geopagos/react-oz-wizard';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import ImgWithPath from './ImgWithPath';

const BackButtonRefactor = ({
  iconPath = 'icons/arrow-back.svg',
  ...props
}) => {
  const { goBack, hasPreviousStep } = useNavigation();
  const sx = useStyles();
  if (!hasPreviousStep) {
    return (
      <button data-testid="backButton" className={sx.hide} {...props}>
        <ImgWithPath alt="Volver hacia atrás" src={iconPath} />
      </button>
    );
  }

  return (
    <button
      data-testid="backButton"
      className={sx.root}
      onClick={hasPreviousStep ? goBack : null}
      {...props}
    >
      <ImgWithPath alt="Volver hacia atrás" src={iconPath} />
    </button>
  );
};

export default BackButtonRefactor;

const useStyles = makeStyles(() => ({
  root: {
    border: 0,
    padding: 0,
    width: 'fit-content',
    background: 'transparent',
    cursor: 'pointer',
    '& img': {
      height: 25,
      width: 25,
    },
  },
  hide: {
    border: 0,
    padding: 0,
    width: 'fit-content',
    background: 'transparent',
    cursor: 'pointer',
    '& img': {
      visibility: 'hidden',
    },
  },
}));
