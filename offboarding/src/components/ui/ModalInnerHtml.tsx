import React from 'react';
import { makeStyles } from '@material-ui/core';
import ImgWithPath from './ImgWithPath';

interface Props {
  children: string;
  isOpen?: boolean;
  handleClose?: () => void;
  radius?: number;
  showIcon?: boolean;
}
const ModalInnerHtml: React.FC<Props> = (props) => {
  const { children, isOpen, handleClose, radius = 0, showIcon = true } = props;
  const sx = useStyles();
  return (
    <>
      {isOpen && (
        <div className={sx.MODAL_ROOT}>
          <div className={sx.MODAL_DIALOG} style={{ borderRadius: radius }}>
            {showIcon && (
              <ImgWithPath
                src="assets/information.svg"
                style={{ padding: '2em 2em 1em 2em' }}
              />
            )}

            <div
              dangerouslySetInnerHTML={{ __html: children }}
              className={sx.INNER_HTML}
            />
            <div className={sx.BOTTOM_BOX}>
              <button className="bottom-box-button" onClick={handleClose}>
                {' '}
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalInnerHtml;

const useStyles = makeStyles((theme) => ({
  MODAL_ROOT: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#00000057',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 100,
  },
  MODAL_DIALOG: {
    position: 'fixed',
    transform: 'translate(-50%,-50%)',
    backgroundColor: 'white',
    display: 'grid',
    justifyItems: 'center',
    width: '50vw',
    height: 'fit-content',
    top: '50%',
    left: '50%',
    zIndex: 200,
    [theme.breakpoints.down('xs')]: {
      /* MOBILE VIEW */ width: '90vw',
      top: '30%',
    },
  },
  INNER_HTML: {
    fontSize: 16,
    fontWeight: 300,
    color: '#191C3C',
    padding: '0 2em',
    textAlign: 'left',
    [theme.breakpoints.down('xs')]: {
      /* MOBILE VIEW */ textAlign: 'left',
    },
    '& a': {
      fontWeight: 400,
      color: '#191C3C',
    },
  },
  BOTTOM_BOX: {
    borderTop: '1px solid #F0F0F0',
    width: '100%',
    padding: '1em',
    display: 'grid',
    justifyItems: 'right',
    [theme.breakpoints.down('xs')]: {
      justifyItems: 'center',
    },
    '& .bottom-box-button': {
      background: 'none',
      margin: 0,
      border: 'none',
      color: theme.palette.primary.main ?? '#191C3C',
      fontSize: 16,
      fontWeight: 600,
      cursor: 'pointer',
    },
  },
}));
