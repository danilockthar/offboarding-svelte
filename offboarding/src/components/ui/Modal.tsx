import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialog-paper': {
      margin: 0,
      padding: 24
    }
  },
  content: {
    padding: 0,
  },
  closeButton: {
    justifyContent: 'flex-start',
    margin: 0,
    padding: 0,
    color: theme.palette.grey[500],
    '&:hover': {
      background: 'none',
    }
  },
}));

export interface DialogProps {
  show?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
  handleClose?: () => void;
}

const ModalComponent: React.FC<DialogProps> = (props) => {
  const { children, onClose, show, handleClose } = props;
  const classes = useStyles();

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={show}
        className={classes.root}
      >
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
        <MuiDialogContent
          className={classes.content}
        >
          {children}
        </MuiDialogContent>
      </Dialog>
    </>
  )
}

export default ModalComponent;
