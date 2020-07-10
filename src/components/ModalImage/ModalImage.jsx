import React from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@material-ui/core';

import styles from './ModalImage.module.scss';

const ModalImage = ({ isOpen, imageAlt, imageSrc, callBack }) => {
  const [open, setOpen] = React.useState(isOpen);

  const handleClose = () => {
    setOpen(false);
    callBack({ word: '', imageSrc: '', isShow: false });
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <img className={styles.ModalImage__image} src={imageSrc} alt={imageAlt} />
    </Dialog>
  );
};

ModalImage.propTypes = {
  isOpen: PropTypes.bool.isRequired,

  imageAlt: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  callBack: PropTypes.func.isRequired,
};

export default ModalImage;
