import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useNavigation } from "@geopagos/react-oz-wizard";
import ImgWithPath from "./ImgWithPath";

const styles = () => ({
  root: {
    border: 0,
    padding: 0,
    background: 'transparent',
    cursor: 'pointer',
    '& img': {
      height: 45,
      width: 45,
    },
  },
});

const BackButton = ({ classes, iconPath, ...props }) => {
  const { goBack } = useNavigation();

  return (
    <button
      data-testid="backButton"
      className={classes.root}
      onClick={goBack}
      {...props}
    >
      <ImgWithPath alt="Volver hacia atrás" src={iconPath} />
    </button>
  );
};

BackButton.defaultProps = {
  iconPath: 'icons/arrow-back.svg',
};

BackButton.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
  iconPath: PropTypes.string,
};

export default withStyles(styles)(BackButton);
