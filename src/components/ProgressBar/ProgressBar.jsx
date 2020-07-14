import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress, Tooltip } from '@material-ui/core';

import { getRatingColors } from '../../helpers/repeat-logic-utils';

import styles from './ProgressBar.module.scss';

const ProgressBar = ({ progress, settings }) => {
  const { cardsShowedStatistic, newCardsShowedStatistic } = progress;
  const { newWordsPerDay, wordsPerDay } = settings;
  const maxProgressValue = 100;

  const cntNewWordsShowedToday = newCardsShowedStatistic[0];
  const newWordsProgress = (maxProgressValue * cntNewWordsShowedToday) / newWordsPerDay;
  const cntCardsShowedToday = cardsShowedStatistic[0];
  const allWordsProgress = (maxProgressValue * cntCardsShowedToday) / wordsPerDay;
  const newWordsProgressValue =
    newWordsProgress > maxProgressValue ? maxProgressValue : newWordsProgress;
  const allWordsProgressValue =
    allWordsProgress > maxProgressValue ? maxProgressValue : allWordsProgress;
  const newWordsStateColors = getRatingColors(newWordsProgress);
  const allWordsStateColors = getRatingColors(allWordsProgress);

  const useStyles = makeStyles({
    root: {
      width: '100%',
    },

    newWordsPassed: {
      background: newWordsStateColors.passedColor,
    },

    newWordsFull: {
      background: newWordsStateColors.backgroundColor,
    },

    allPassed: {
      background: allWordsStateColors.passedColor,
    },

    allFull: {
      background: allWordsStateColors.backgroundColor,
    },
  });

  const classes = useStyles();

  return (
    <>
      <Tooltip
        className={styles['ProgressBar__new-words']}
        title="Изучено новых слов сегодня"
        enterDelay={500}
      >
        <div className={classes.root}>
          <LinearProgress
            variant="determinate"
            value={newWordsProgressValue}
            classes={{
              barColorPrimary: classes.newWordsPassed,
              colorPrimary: classes.newWordsFull,
            }}
          />
          <div className={styles.ProgressBar__values}>
            {`${cntNewWordsShowedToday} / ${newWordsPerDay}`}
          </div>
        </div>
      </Tooltip>
      <Tooltip
        className={styles['ProgressBar__all-words']}
        title="Пройдено слов всего"
        enterDelay={500}
      >
        <div className={classes.root}>
          <LinearProgress
            variant="determinate"
            value={allWordsProgressValue}
            classes={{
              barColorPrimary: classes.allPassed,
              colorPrimary: classes.allFull,
            }}
          />
          <div className={styles.ProgressBar__values}>
            {`${cntCardsShowedToday} / ${wordsPerDay}`}
          </div>
        </div>
      </Tooltip>
    </>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.objectOf(PropTypes.any).isRequired,
  settings: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProgressBar;
