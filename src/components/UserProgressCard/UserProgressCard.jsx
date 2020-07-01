import React from 'react';
import Grid from '@material-ui/core/Grid';

import styles from './UserProgressCard.module.scss';

import UserStateIndicator from '../UserStateindIcator';

const UserProgressCard = () => {
  return (
    <Grid item className={styles.UserProgressCard}>
      Процент правильных ответов сегодня:
      <UserStateIndicator
        value={7}
        hint="Подсказка работает Подсказка работает Подсказка работает "
      />
    </Grid>
  );
};

export default UserProgressCard;
