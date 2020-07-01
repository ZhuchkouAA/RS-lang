import React from 'react';
import Grid from '@material-ui/core/Grid';

import styles from './UserProgressCard.module.scss';
import ProgressBar from '../ProgressBar';

import UserStateIndicator from '../UserStateindIcator';

const UserProgressCard = () => {
  return (
    <Grid item className={styles.UserProgressCard}>
      To do...RSL-25: Create User progress for main page
      <ProgressBar />
      <UserStateIndicator value={40} />
    </Grid>
  );
};

export default UserProgressCard;
