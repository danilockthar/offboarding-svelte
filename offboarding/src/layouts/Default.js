import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from "@material-ui/core/Typography";
import isFunction from 'lodash/isFunction';
import { Grid } from "@material-ui/core";
import ImgWithPath from '../components/ui/ImgWithPath';
import MainLoader from '../components/ui/MainLoader';
import useTimedLoading from '../helpers/hooks/useTimedLoading';
import FloatingIconGroupCircle from '../components/ui/FloatingIconGroupCircle';

const styles = (theme) => ({
  '@global': {
    form: {
      width: '100%',
    },
  },
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    paddingBottom: 50,
    [theme.breakpoints.down('xs')]: {
      background: 'white',
    },
  },
  header: {
    width: '100%',
    height: 138,
    padding: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      height: 128,
      padding: 16,
      justifyContent: 'center',
    },
    '& $text': {
      color: theme.palette.text.light,
      fontSize: 24,
      fontWeight: 600,
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
  },
  logo: {
    marginTop: 36
  },
  text: {},
  body: {
    flex: 1,
    width: 645,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  box: {
    position: 'relative',
    padding: '40px 80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 8,
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.2)',
    [theme.breakpoints.down('xs')]: {
      padding: '40px 32px',
      borderRadius: 0,
      boxShadow: 'none',
      paddingTop: 0,
    },
    '& header': {
      paddingBottom: 16,
    },
    '& section': {
      paddingTop: 32,
      paddingBottom: 0,
    },
    '& footer': {
      paddingTop: 64,
    },
  },
  headerIcons: {
    position: 'absolute',
    top: -32,
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
      paddingRight: 0,
    },
  },
});

const Layout = ({ classes, children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
  const [ layoutProps, setLayoutProps ] = React.useState({ title: '' });
  const { isLoading } = useTimedLoading(250);

  const logoPath = `assets/logo.svg`;

  if(isLoading) {
    return <MainLoader isLoading={isLoading} />;
  }

  const onStepChange = (stepName, stepLayoutProps) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    setLayoutProps(stepLayoutProps);
  }

  return (
    <div className={classNames(classes.root)}>
      <div className={classes.header}>
        <Typography className={classes.text}>{layoutProps.title}</Typography>
      </div>

      <div className={classes.body}>
        <Paper className={classes.box}>
          {layoutProps.icons && !isMobile && (
            <FloatingIconGroupCircle
              className={classes.headerIcons}
              selected={layoutProps.selectedIcon || 0}
              icons={layoutProps.icons}
            />
          )}

          {isFunction(children) ? children({ onStepChange }) : children}
        </Paper>
        <Grid container
              direction="row"
              justify="center"
              alignItems="center"
        >
          <Grid>
            <ImgWithPath src={logoPath} className={classes.logo}/>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

Layout.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    box: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    headerIcons: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
}

export default withStyles(styles)(Layout);
