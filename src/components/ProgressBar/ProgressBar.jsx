import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
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
      <div className={styles.WordCount}>
        <p className={styles.WordCount__count}>{`${nowValue} / ${maxValue}`}</p>
        <ArrowBackIosIcon className={styles.WordCount__icon} />
      </div>
    </div>
  );
}
