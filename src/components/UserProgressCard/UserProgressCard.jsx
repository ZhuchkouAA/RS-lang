import React from 'react';

import Grid from '@material-ui/core/Grid';

import PropTypes from 'prop-types';

import styles from './UserProgressCard.module.scss';

import UserStateIndicator from '../UserStateindIcator';

const UserProgressCard = ({ progress, settings }) => {
  const { newWordsPerDay } = settings;
  const { wordsPerDay } = settings;
  const { cardsShowedAllTime } = progress;
  const { leftNewWordsToday } = progress;
  return (
    <Grid item className={styles.UserProgressCard}>
      <UserStateIndicator
        lowerLimit={newWordsPerDay}
        upperLimit={wordsPerDay}
        hint="hint hint hint"
        header="header header"
      />
      <UserStateIndicator
        lowerLimit={cardsShowedAllTime}
        upperLimit={leftNewWordsToday}
        hint="hint hint hint"
        header="header header"
      />
    </Grid>
  );
};

UserProgressCard.propTypes = {
  progress: PropTypes.objectOf(PropTypes.any).isRequired,
  settings: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default UserProgressCard;
