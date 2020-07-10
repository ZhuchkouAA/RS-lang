import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import URLS from '../../../constants/APIUrls';

const iconStyles = makeStyles({
  root: {
    textTransform: 'none',
  },
});

const TablePaginationActions = ({ word, imageSrc, onClick }) => {
  const handlerClickWord = () => {
    onClick(word, `${URLS.ASSETS}${imageSrc}`);
  };
  const buttonText = iconStyles();

  return (
    <Button href="#text-buttons" classes={buttonText} color="primary" onClick={handlerClickWord}>
      {word}
    </Button>
  );
};

TablePaginationActions.propTypes = {
  word: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TablePaginationActions;
