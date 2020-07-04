import React from 'react';
import Grid from '@material-ui/core/Grid';

import styles from './UserProgressCard.module.scss';

import UserStateIndicator from '../UserStateindIcator';

const UserProgressCard = () => {
  return (
    <Grid item className={styles.UserProgressCard}>
      <UserStateIndicator />
      <UserStateIndicator />
      <UserStateIndicator />
      <UserStateIndicator />
      <UserStateIndicator />
    </Grid>
  );
};

export default UserProgressCard;
