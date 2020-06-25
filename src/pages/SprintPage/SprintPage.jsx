import React from 'react';
import { Card, Grid, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import Timer from '../../components/Timer';
import StatusIcon from '../../components/StatusIcon';
import styles from './SprintPage.module.scss';
import Button from '../../components/Button';

const SprintPage = () => (
  <>
    <Grid container direction="row" justify="center" alignItems="center">
      <Typography gutterBottom variant="h4">
        <Box color="success.main">9999</Box>
      </Typography>
      <Timer value={25} />
    </Grid>

    <Grid container direction="row" justify="center" alignItems="center">
      <Card className={styles.Card}>
        <Grid item className={styles.Card__header}>
          <Box className={styles.Card__icons} color="success.main">
            <StatusIcon isActive />
            <StatusIcon isActive={false} />
            <StatusIcon isActive={false} />
          </Box>
          <Typography className={styles.Card__points} gutterBottom variant="h6">
            <Box>+20 очков</Box>
          </Typography>
        </Grid>
        <Grid className={styles.Card__main}>
          <Typography gutterBottom variant="h4">
            <Box>allow</Box>
          </Typography>
          <Typography gutterBottom variant="h5">
            <Box>позволять</Box>
          </Typography>
        </Grid>
        <Divider />
        <Grid className={styles.Card__buttons}>
          <div className={styles.Card__button}>
            <Button color="secondary" text="Неверно" />
          </div>
          <div>
            <Button color="primary" text="Верно" />
          </div>
        </Grid>
      </Card>
    </Grid>
  </>
);

export default SprintPage;
