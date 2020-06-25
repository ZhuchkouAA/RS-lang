import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { CircularProgress } from '@material-ui/core';

const Timer = ({ value }) => (
  <Box color="success.main">
    <CircularProgress color="inherit" variant="static" value={value} />
  </Box>
);

Timer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Timer;
