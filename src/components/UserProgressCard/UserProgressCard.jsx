import React from 'react';
import Grid from '@material-ui/core/Grid';

import styles from './UserProgressCard.module.scss';

import UserStateIndicator from '../UserStateindIcator';

const UserProgressCard = () => {
  return (
    <Grid item className={styles.UserProgressCard}>
      <UserStateIndicator nowValue={6} maxValue={7} hint="Количество изученных слов на сегодня" />
    </Grid>
  );
};

export default UserProgressCard;
