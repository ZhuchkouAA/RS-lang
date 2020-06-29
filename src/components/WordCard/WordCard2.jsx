import React from 'react';
import PropTypes from 'prop-types';

import { Box, IconButton, Tooltip } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

const WordCard2 = ({ queue, onDeleteButton }) => {
  return (
    <>
      {`WORD:${queue[queue.length - 1].optional.word}`}
      <Box position="absolute">
        <Tooltip title="Удалить слово из изучения">
          <IconButton aria-label="delete" onClick={onDeleteButton}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
};

WordCard2.propTypes = {
  queue: PropTypes.arrayOf(PropTypes.any).isRequired,
  onDeleteButton: PropTypes.func.isRequired,
};
export default WordCard2;
