import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Tooltip, Typography, CircularProgress, makeStyles } from '@material-ui/core';

import { getRatingColors } from '../../helpers/repeat-logic-utils';

import styles from './UserStateIndicator.module.scss';

const UserStateIndicator = ({ header, hint, rating, value, unit, reverse }) => {
  const PERCENTS = 100;

  let checkedRating = rating > 0 ? rating : 0;
  checkedRating = checkedRating <= PERCENTS ? checkedRating : PERCENTS;

  const colorRate = reverse ? Math.round(PERCENTS - checkedRating) : checkedRating;
  const stateColors = getRatingColors(colorRate);
  const ratingSource = value !== null ? value : rating;
  const ratingText = unit ? `${ratingSource}${unit}` : ratingSource;

  const useStyles = makeStyles(() => ({
    passedColor: {
      color: stateColors.passedColor,
    },

    backgroundColor: {
      color: stateColors.backgroundColor,
    },
  }));

  const classes = useStyles();

  const Circular = () => {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress
          classes={{ root: classes.passedColor }}
          size="60px"
          variant="static"
          value={checkedRating}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          zIndex={-2}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress
            classes={{ root: classes.backgroundColor }}
            size="60px"
            variant="static"
            value={PERCENTS}
          />
        </Box>
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
          <Typography variant="h6" component="div">
            {ratingText}
          </Typography>
          <span className={styles.UserStateIndicator__header}>{header}</span>
        </Box>
      </Box>
    );
  };

  return (
    <Tooltip title={hint} classes={{ tooltip: classes.tooltipText }}>
      <Button className={classes.button}>{Circular()}</Button>
    </Tooltip>
  );
};

UserStateIndicator.defaultProps = {
  unit: '',
  reverse: false,
  value: null,
};

UserStateIndicator.propTypes = {
  rating: PropTypes.number.isRequired,
  value: PropTypes.number,
  hint: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  unit: PropTypes.string,
  reverse: PropTypes.bool,
};

export default UserStateIndicator;
