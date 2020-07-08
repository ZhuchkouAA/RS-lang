import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  Tooltip,
  Typography,
  CircularProgress,
  makeStyles,
  Grid,
} from '@material-ui/core';
import { getRatingColors } from '../../helpers/repeat-logic-utils';

import style from './UserStateIndicator.module.scss';

const UserStateIndicator = ({ lowerLimit, upperLimit, hint, header }) => {
  const value = (lowerLimit * 100) / upperLimit;
  const stateColors = getRatingColors(value);

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    tooltipText: {
      textAlign: 'justify',
      padding: '10px',
      fontSize: '14px',
      backgroundColor: 'black',
    },
    circular: {
      color: stateColors.backgroundColor,
    },
  }));

  const classes = useStyles();

  const Circular = () => {
    return (
      <Grid container direction="row">
        <p className={style.TittleProgress}>{header}</p>
        <Box position="relative" display="inline-flex">
          <CircularProgress
            classes={{ root: classes.circular }}
            size="70px"
            variant="static"
            value={value}
          />
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
            <Typography variant="caption" component="div" color="textSecondary">
              <div className={style.lowerLimit}>
                {lowerLimit}
                <br />
              </div>
              <div className={style.separatorValue}>
                /
                <br />
              </div>
              <div className={style.upperLimit}>{upperLimit}</div>
            </Typography>
          </Box>
        </Box>
      </Grid>
    );
  };

  return (
    <Tooltip title={hint} classes={{ tooltip: classes.tooltipText }}>
      <Button className={classes.button}>{Circular()}</Button>
    </Tooltip>
  );
};

export default UserStateIndicator;

UserStateIndicator.propTypes = {
  lowerLimit: PropTypes.number.isRequired,
  upperLimit: PropTypes.number.isRequired,
  hint: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
};
