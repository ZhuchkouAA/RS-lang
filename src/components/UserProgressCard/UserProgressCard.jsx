import React from 'react';

import Grid from '@material-ui/core/Grid';

import PropTypes from 'prop-types';

import styles from './UserProgressCard.module.scss';

import UserStateIndicator from '../UserStateindIcator';

const UserProgressCard = ({ progress, settings }) => {
  const { wordsPerDay, newWordsPerDay } = settings;
  const {
    differentCardsShowedAllTime,
    longestTodaySeries,
    leftRepeatWordsToday,
    leftNewWordsToday,
    rightAnswersStatistic,
  } = progress;
  const COUNT_ALL_WORDS = 3600;
  const PERCENTS = 100;
  const leftNewWordsTodayPercent = Math.round(
    Math.trunc(leftNewWordsToday / newWordsPerDay) * PERCENTS
  );
  const leftRepeatWordsTodayPercent =
    wordsPerDay - newWordsPerDay > 0
      ? Math.round(Math.trunc(leftNewWordsToday / (wordsPerDay - newWordsPerDay)) * PERCENTS)
      : 0;
  const longestTodaySeriesPercent = Math.round(
    Math.trunc(longestTodaySeries / wordsPerDay) * PERCENTS
  );
  const differentCardsShowedAllTimePercent = Math.round(
    Math.trunc(differentCardsShowedAllTime / COUNT_ALL_WORDS) * PERCENTS
  );

  return (
    <Grid
      container
      className={styles.UserProgressCard}
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      <Grid item>
        <UserStateIndicator
          header="Новые"
          hint="Осталось изучить новых слов сегодня"
          rating={leftNewWordsTodayPercent}
          value={leftNewWordsToday}
          reverse
        />
      </Grid>
      <Grid item>
        <UserStateIndicator
          header="Повторы"
          hint="Осталось повторить слов сегодня"
          rating={leftRepeatWordsTodayPercent}
          value={leftRepeatWordsToday}
          reverse
        />
      </Grid>
      <Grid item>
        <UserStateIndicator
          header="Ответы"
          hint="Процент правильных ответов сегодня"
          rating={rightAnswersStatistic[0]}
          unit="%"
        />
      </Grid>
      <Grid item>
        <UserStateIndicator
          header="Серия"
          hint="Самая длинная серия правильных ответов сегодня"
          rating={longestTodaySeriesPercent}
          value={longestTodaySeries}
        />
      </Grid>
      <Grid item>
        <UserStateIndicator
          header="Всего"
          hint="Всего на изучении разных слов из 3600"
          rating={differentCardsShowedAllTimePercent}
          value={differentCardsShowedAllTime}
        />
      </Grid>
    </Grid>
  );
};

UserProgressCard.propTypes = {
  progress: PropTypes.objectOf(PropTypes.any).isRequired,
  settings: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default UserProgressCard;
