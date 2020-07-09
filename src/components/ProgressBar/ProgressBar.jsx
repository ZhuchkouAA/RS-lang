import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress, Tooltip } from '@material-ui/core';

import { getRatingColors } from '../../helpers/repeat-logic-utils';

import styles from './ProgressBar.module.scss';

const ProgressBar = ({ progress, settings }) => {
  const { cardsShowedStatistic } = progress;
  const { wordsPerDay } = settings;

  const cntCardsShoedToday = cardsShowedStatistic[0];
  const maxProgressValue = 100;
  const currentLearningProgress = (maxProgressValue * cntCardsShoedToday) / wordsPerDay;
  const stateColors = getRatingColors(currentLearningProgress);

  const useStyles = makeStyles({
    root: {
      width: '100%',
    },

    passed: {
      background: stateColors.passedColor,
    },

    full: {
      background: stateColors.backgroundColor,
    },
  });

  const classes = useStyles();

  return (
    <Tooltip className={styles.ProgressBar} title="Изучено слов сегодня" enterDelay={1000}>
      <div className={classes.root}>
        <LinearProgress
          variant="determinate"
          value={currentLearningProgress}
          classes={{ barColorPrimary: classes.passed, colorPrimary: classes.full }}
        />
        <div className={styles.ProgressBar__values}>{`${cntCardsShoedToday} / ${wordsPerDay}`}</div>
      </div>
    </Tooltip>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.objectOf(PropTypes.any).isRequired,
  settings: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProgressBar;
