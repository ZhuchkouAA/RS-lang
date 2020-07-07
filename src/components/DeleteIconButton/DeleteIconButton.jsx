import React from 'react';
import PropTypes from 'prop-types';

import { IconButton, Tooltip } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

const DeleteIconButton = ({ handlerClick, word, wordKey }) => {
  const handlerClickDelete = () => {
    handlerClick(word, wordKey);
  };

  return (
    <Tooltip title="Удалить из сложных" enterDelay={500}>
      <IconButton aria-label="delete" onClick={handlerClickDelete}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

DeleteIconButton.propTypes = {
  handlerClick: PropTypes.func.isRequired,
  word: PropTypes.string.isRequired,
  wordKey: PropTypes.string.isRequired,
};

export default DeleteIconButton;
