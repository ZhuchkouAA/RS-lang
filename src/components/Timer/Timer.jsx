import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const Timer = ({ value, coefficient, color }) => (
  <Box position="relative" display="inline-flex">
    <CircularProgress color={color} variant="static" value={value * coefficient} />
    <Box
      top={0}
      left={0}
      bottom={0}
      right={0}
      position="absolute"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography color={color} variant="h6" component="div">
        {Math.round(value)}
      </Typography>
    </Box>
  </Box>
);

Timer.propTypes = {
  value: PropTypes.number.isRequired,
  coefficient: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default Timer;
