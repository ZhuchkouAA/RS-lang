import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import UserStateIndicator from '../UserStateindIcator';
import { calcUserIndicatorState } from '../../helpers/getProgress-utils';

import styles from './UserProgressCard.module.scss';

const UserProgressCard = ({ settings, progress }) => {
  const {
    differentCardsShowedAllTime,
    longestTodaySeries,
    leftRepeatWordsToday,
    leftNewWordsToday,
  } = progress;

  const userIndicatorState = calcUserIndicatorState(settings, progress);

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
          rating={userIndicatorState.leftNewWordsTodayPercent}
          value={leftNewWordsToday}
        />
      </Grid>
      <Grid item>
        <UserStateIndicator
          header="Повторы"
          hint="Осталось повторить слов сегодня"
          rating={userIndicatorState.leftRepeatWordsTodayPercent}
          value={leftRepeatWordsToday}
        />
      </Grid>
      <Grid item>
        <UserStateIndicator
          header="Ответы"
          hint="Процент правильных ответов сегодня"
          rating={userIndicatorState.rightAnswersStatisticPercent}
          unit="%"
        />
      </Grid>
      <Grid item>
        <UserStateIndicator
          header="Серия"
          hint="Самая длинная серия правильных ответов сегодня"
          rating={userIndicatorState.longestTodaySeriesPercent}
          value={longestTodaySeries}
        />
      </Grid>
      <Grid item>
        <UserStateIndicator
          header="Всего"
          hint="Всего на изучении разных слов из 3600"
          rating={userIndicatorState.differentCardsShowedAllTimePercent}
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
