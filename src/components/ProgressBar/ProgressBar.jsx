import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress, Tooltip } from '@material-ui/core';

import { getRatingColors } from '../../helpers/repeat-logic-utils';

import styles from './ProgressBar.module.scss';

const ProgressBar = ({ progress, settings }) => {
  const { leftNewWordsToday } = progress;
  const { newWordsPerDay } = settings;

  const cntNewWordsShowedToday = Math.round(newWordsPerDay - leftNewWordsToday);
  const maxProgressValue = 100;
  const currentLearningProgress = (maxProgressValue * cntNewWordsShowedToday) / newWordsPerDay;
  const progressValue =
    currentLearningProgress > maxProgressValue ? maxProgressValue : currentLearningProgress;
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
    <Tooltip className={styles.ProgressBar} title="Изучено новых слов сегодня" enterDelay={500}>
      <div className={classes.root}>
        <LinearProgress
          variant="determinate"
          value={progressValue}
          classes={{ barColorPrimary: classes.passed, colorPrimary: classes.full }}
        />
        <div className={styles.ProgressBar__values}>
          {`${cntNewWordsShowedToday} / ${newWordsPerDay}`}
        </div>
      </div>
    </Tooltip>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.objectOf(PropTypes.any).isRequired,
  settings: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProgressBar;
