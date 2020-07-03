import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, Tooltip } from '@material-ui/core';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import MusicIcon from '@material-ui/icons/MusicNote';
import { VolumeOff, VolumeUp } from '@material-ui/icons';

const SoundDisableIcon = ({ handlerClick, isMute, type }) => {
  let SoundIcon;

  if (type === 'soundDisable') {
    SoundIcon = isMute ? VolumeOff : VolumeUp;
  }

  if (type === 'musicDisable') {
    SoundIcon = isMute ? MusicOffIcon : MusicIcon;
  }

  return (
    <Box right="16px">
      <Tooltip title="Выключить звук">
        <IconButton onClick={handlerClick} aria-label="mute">
          <SoundIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

SoundDisableIcon.propTypes = {
  handlerClick: PropTypes.func.isRequired,
  isMute: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

export default SoundDisableIcon;
