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

const IconMini = ({ handlerClick, srcUrl }) => {
  const fab = fabStyles();
  const icon = iconStyles();

  const handlerClickPlay = () => {
    if (srcUrl) {
      const player = new Audio();
      player.src = srcUrl;
      player.autoplay = true;
    }
  };

  const handler = srcUrl ? handlerClickPlay : handlerClick;

  return (
    <Fab onClick={handler} className={fab.root} type="button" color="primary" size="small">
      <PlayCircleOutlineRoundedIcon className={icon.root} />
    </Fab>
  );
};

IconMini.defaultProps = {
  handlerClick: () => {},
  srcUrl: '',
};

IconMini.propTypes = {
  handlerClick: PropTypes.func,
  srcUrl: PropTypes.string,
};

export default IconMini;
