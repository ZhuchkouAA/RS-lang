import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

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

const DialogTitle = withStyles(styles)((props) => {
  return (
    <MuiDialogTitle disableTypography className={props.classes.root}>
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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const CustomizedDialogs = ({ isOpen, type, message }) => {
  const [open, setOpen] = React.useState(isOpen);

  const handleClose = () => {
    setOpen(false);
  };
  let x;
  if (type === 'info') {
    x = style.background;
  } else {
    x = style.background2;
  }

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {type}
        </DialogTitle>
        <DialogContent dividers>
          <Typography className={x} gutterBottom>
            {message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
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
};

export default CustomizedDialogs;
