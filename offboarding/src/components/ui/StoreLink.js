import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ImgWithPath from "./ImgWithPath";

const styles = () => ({
  root: {
    display: 'block',
    width: 154,
    height: 47,
    padding: '10px 18px 9px 19px',
    borderRadius: 8,
    backgroundColor: '#000000',
  },
})

const StoreLink = ({ type, href, classes }) => {
  return (
    <a href={href} className={classes.root}>
      <ImgWithPath alt="app store" src={`images/stores/${type}.svg`} />
    </a>
  );
};

StoreLink.propTypes = {
  type: PropTypes.oneOf(['ios', 'android']).isRequired,
  href: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
}

export default withStyles(styles)(StoreLink);
