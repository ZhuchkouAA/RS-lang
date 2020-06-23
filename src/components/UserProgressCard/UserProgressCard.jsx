import React from 'react';
import Grid from '@material-ui/core/Grid';

import styles from './UserProgressCard.module.scss';
import ProgressBar from '../ProgressBar';

const UserProgressCard = () => {
  return (
    <Grid item className={styles.UserProgressCard}>
      To do...RSL-25: Create User progress for main page
      <ProgressBar />
    </Grid>
  );
};

export default UserProgressCard;
