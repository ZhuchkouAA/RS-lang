import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { NavLink } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import Button from '../Button';
import paths from '../../constants/path';
import styles from './MiniGamesStatistics.module.scss';

const MiniGamesStatistics = ({ title, description }) => {
  return (
    <Grid className={styles.wrapper} container direction="row" justify="center" alignItems="center">
      <Card className={styles.StatisticsCard}>
        <Typography gutterBottom variant="h4">
          <Box>{title}</Box>
        </Typography>
        <Typography gutterBottom variant="h6">
          <Box>{description}</Box>
        </Typography>
        <Grid className={styles.ButtonsGroup}>
          <NavLink className={styles.ButtonsGroup__link} to={paths.GAME_START_SCREEN}>
            <Button text="ЕЩЕ РАЗ" color="secondary" />
          </NavLink>
          <NavLink className={styles.ButtonsGroup__link} to={paths.MAIN}>
            <Button text="ОК" color="primary" />
          </NavLink>
        </Grid>
      </Card>
    </Grid>
  );
};

MiniGamesStatistics.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default MiniGamesStatistics;
