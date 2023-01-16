import React, { Children } from 'react';

import { withStyles } from '@material-ui/core/styles';

import ImgWithPath from './ImgWithPath';

const styles = () => ({
  ul: {
    marginTop: '8px',
    listStyleType: 'none',
    marginLeft: '2.3rem',
    paddingLeft: 0,
    display: 'flex',
    flexDirection: 'column',
    '&> li': {
      position: 'relative',
      textAlign: 'left',
      margin: '7px 0px',
    },
  },
  li: {
    left: '-2rem',
    position: 'absolute',
    textAlign: 'center',
    width: '2rem',
    lineHeight: 'inherit',
  },
  childrenText: {
    color: '#000000',
    marginLeft: '5px'
  }
});

const ListWithIcon = ({ children, classes }) => {
  return (
    <ul className={classes.ul}>
      {Children.map(children || null, (Child) =>
        React.cloneElement(Child, { classes }),
      )}
    </ul>
  );
};

ListWithIcon.Item = ({ icon, children, classes, iconSize = 10 }) => {
  return (
    <li>
      <span className={classes.li}>
        <ImgWithPath size={iconSize} src={icon} />
      </span>
      <span className={classes.childrenText}>
        {children}
      </span>
    </li>
  );
};

export default withStyles(styles)(ListWithIcon);
