import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import __ from 'src/i18n';
import { Typography } from '@material-ui/core';
import ImgWithPath from 'src/components/ui/ImgWithPath';
import { useGlobalState } from 'src/context/GlobalStateContext';
import useUnsubscribe from '../services/useUnsubscribe';

const UnsubscribeRequest = () => {
  const fx = useStyles();
  const { globalState } = useGlobalState();
  const { requestNumber } = globalState;

  return (
    <div className={fx.ROOT}>
      <ImgWithPath className="img-miss-you" src="assets/missyou.svg" />
      <Typography variant="h1" className={'title'}>
        {__('common.unsubscribeRequestTitle')}
      </Typography>
      <p>
        {' '}
        {__('common.requestNumber')} <b> {requestNumber} </b>
      </p>
      <p>
        Gracias por haber sido parte de la experiencia viüMi ¡Te vamos a
        extrañar!
      </p>
      <p className="info_viumi">
        ¿Tenés alguna duda o inconveniente? Podemos ayudarte. Llamanos al{' '}
        <a href="tel:0810-345-4222" className={fx.BOLD_VIUMI}>
          0810-345-4222
        </a>{' '}
        o envianos un e-mail a{' '}
        <a href="mailto:consultas@viumi.com.ar" className={fx.BOLD_VIUMI}>
          consultas@viumi.com.ar
        </a>
      </p>
      <button className="delete-account-btn"> {__('common.exit')} </button>
    </div>
  );
};

export default UnsubscribeRequest;

const useStyles = makeStyles((theme) => ({
  ROOT: {
    fontFamily: 'Roboto',
    display: 'grid',
    gridAutoRows: 'min-content',
    rowGap: '1rem',
    height: '100%',
    padding: '2rem',
    [theme.breakpoints.down('xs')]: {
      /* MOBILE VIEW */ minHeight: '100vh',
      padding: '0rem 1rem 1rem 1rem',
    },
    '& p': {
      margin: '4px 0',
    },
    '& .title': {
      margin: '12px 0',
      fontSize: 24,
      [theme.breakpoints.down('xs')]: {
        textAlign: 'left',
      },
      textAlign: 'center',
    },
    '& .img-miss-you': {
      justifySelf: 'center',
    },
    '& .delete-account-btn': {
      [theme.breakpoints.down('xs')]: {
        display: 'inherit',
        margin: '2rem 0 0 0',
        background: theme.palette.primary.main,
        borderRadius: '24px',
        transition: '0.3s',
        fontSize: 16,
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
      },
      display: 'none',
    },
  },
  BOLD_VIUMI: {
    textDecoration: 'none',
    fontWeight: 600,
    color: '#4527a0',
  },
}));
