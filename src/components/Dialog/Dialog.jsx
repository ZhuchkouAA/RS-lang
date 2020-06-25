import React from 'react';

import { withStyles, Button, Dialog, IconButton, Typography } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import PropTypes from 'prop-types';

import style from './Dialog.module.scss';

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

const CustomizedDialogs = ({ isOpen, type, tittle, message }) => {
  const [open, setOpen] = React.useState(isOpen);

  const handleClose = () => {
    setOpen(false);
  };
  const stylesDialog = {};
  if (type.toLowerCase() === 'info') {
    stylesDialog.ModalWindow__title = style.ModalWindow__title;
  } else if (type.toLowerCase() === 'error') {
    stylesDialog.ModalWindow__title = style['ModalWindow__title-error'];
  }

  const DialogTitle = withStyles(styles)((props) => {
    return (
      <MuiDialogTitle disableTypography className={stylesDialog.ModalWindow__title}>
        <Typography variant="h6">{props.children}</Typography>
        {(props.onClose && (
          <IconButton
            aria-label="close"
            className={props.classes.closeButton}
            onClick={props.onClose}
          >
            <CloseIcon />
          </IconButton>
        )) ||
          null}
      </MuiDialogTitle>
    );
  });

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {tittle}
      </DialogTitle>
      <DialogContent className={style.ModalWindow__content} dividers>
        <Typography gutterBottom>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          className={style['ModalWindow__button-ok']}
          autoFocus
          onClick={handleClose}
          color="primary"
        >
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CustomizedDialogs.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  tittle: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onClose: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
};

export default CustomizedDialogs;
