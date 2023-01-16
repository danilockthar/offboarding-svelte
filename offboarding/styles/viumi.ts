import createMyTheme from './createMyTheme';
import baseColors from './baseColors';

export const colors = {
  main200: baseColors.hawkesBlue,
  main400: baseColors.funBlue,
  main500: baseColors.congressBlue,
  main600: baseColors.downRiver,
  detail500: baseColors.pictonBlue,
  tertiary: baseColors.turquoise,
  lightGray: baseColors.grayMercury,
  gray: baseColors.silver,
  gray400: baseColors.alto,
  darkGray: baseColors.scorpion,
  error: baseColors.mandy,
  black: baseColors.black,
  lightBlack: baseColors.thunder,
  warning: baseColors.pizazz,
  success: baseColors.mountainMeadow,
  silver: '#393F47',
  brightGray: baseColors.brightGray,
};

const theme = createMyTheme({
  palette: {
    primary: {
      light: colors.main200,
      main: '#4527A0',
      dark: colors.main600,
    },
    error: {
      main: colors.error,
    },
    warning: {
      main: colors.warning,
    },
    success: {
      main: colors.success,
    },
    text: {
      light: baseColors.white,
    },
  },
  typography: {
    fontFamily: 'BBVA Benton Sans',
    fontSize: 16,
    h1: {
      fontFamily: 'BBVA Benton Sans',
      fontWeight: 400,
      fontSize: '1.275rem',
      lineHeight: 1.2,
      color: colors.black,
    },
    h6: {
      fontFamily: 'BBVA Benton Sans',
      fontWeight: 400,
      fontSize: '0.9rem',
      lineHeight: 1,
      color: colors.darkGray,
    },
    h4: {
      fontFamily: 'BBVA Benton Sans',
      fontSize: 14,
      fontWeight: 400,
      color: baseColors.mineShaftGray,
    },
    body1: {
      fontSize: 14,
      fontWeight: 300,
    },
    subtitle1: {
      fontSize: 18,
      color: colors.black,
    },
    subtitle2: {
      fontSize: 14,
      lineHeight: 1,
      color: colors.brightGray,
      '& a': {
        fontWeight: 'bold',
        color: colors.main500,
        textDecoration: 'none',
      },
    },
  },
  overrides: {
    MuiFormLabel: {
      root: {
        color: colors.main500,
        fontWeight: 400,
        fontSize: '0.875rem',
        lineHeight: 1,
      },
    },
  },
});

export default theme;
