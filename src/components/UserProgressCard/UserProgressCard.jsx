import React from 'react';
import Grid from '@material-ui/core/Grid';

import styles from './UserProgressCard.module.scss';

import UserStateIndicator from '../UserStateindIcator';

const UserProgressCard = () => {
  return (
    <Grid item className={styles.UserProgressCard}>
      <UserStateIndicator
        nowValue={7}
        maxValue={10}
        tittle="Количество изученных слов на сегодня"
        hint="Ховер эфект Ховер эфект Ховер эфект Ховер эфект "
      />
    </Grid>
  );
};

export default UserProgressCard;
