import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import styles from './ProgressBar.module.scss';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function Progress() {
  const classes = useStyles();
  const nowValue = 100;
  const maxValue = 500;
  const getPercent = () => {
    return (nowValue * 100) / maxValue;
  };

  return (
    <div className={classes.root}>
      <LinearProgress variant="determinate" value={getPercent()} />
      <div className={styles.WordCount}>{`${nowValue} from ${maxValue}`}</div>
    </div>
  );
}
