import React from 'react';
import { Fab } from '@material-ui/core';
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const fabStyles = makeStyles({
  root: {
    height: 20,
    minHeight: 10,
    padding: 0,
    width: 20,
  },
});

const iconStyles = makeStyles({
  root: {
    height: 15,
    width: 15,
  },
});

const IconMini = ({ handlerClick }) => {
  const fab = fabStyles();
  const icon = iconStyles();
  return (
    <Fab onClick={handlerClick} className={fab.root} type="button" color="primary" size="small">
      <PlayCircleOutlineRoundedIcon className={icon.root} />
    </Fab>
  );
};

IconMini.propTypes = {
  handlerClick: PropTypes.func.isRequired,
};

export default IconMini;
