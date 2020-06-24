import React from 'react';

import { withStyles, Button, Dialog, IconButton, Typography } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import PropTypes from 'prop-types';

import style from './ModalWindow.module.scss';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    justifyContent: 'center',
  },
}))(MuiDialogActions);

const CustomizedDialogs = ({ isOpen, type, message }) => {
  const [open, setOpen] = React.useState(isOpen);
  let modalTittle;

  const handleClose = () => {
    setOpen(false);
  };
  const stylesMyDialog = {};
  if (type.toLowerCase() === 'info') {
    modalTittle = 'Informations';
    stylesMyDialog.ModalWindow__title = style.ModalWindow__title;
  } else if (type.toLowerCase() === 'error') {
    modalTittle = 'Error';
    stylesMyDialog.ModalWindow__title = style.ModalWindow__titleError;
  }

  const DialogTitle = withStyles(styles)((props) => {
    return (
      <MuiDialogTitle disableTypography className={stylesMyDialog.ModalWindow__title}>
        <Typography variant="h6">{props.children}</Typography>
        {props.onClose ? (
          <IconButton
            aria-label="close"
            className={props.classes.closeButton}
            onClick={props.onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {modalTittle}
        </DialogTitle>
        <DialogContent className={style.ModalWindow__content} dividers>
          <Typography gutterBottom>{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            className={style.ModalWindow__buttonOk}
            autoFocus
            onClick={handleClose}
            color="primary"
          >
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

CustomizedDialogs.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onClose: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
};

export default CustomizedDialogs;
