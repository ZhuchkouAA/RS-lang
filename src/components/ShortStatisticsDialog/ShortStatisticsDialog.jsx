import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  Grid,
  Button,
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PATH from '../../constants/path';
import { RIGHT_ANSWER_SERIES } from '../../constants/variables-learning';

import styles from './ShortStatisticsDialog.module.scss';

const useStyles = makeStyles({
  root: {
    marginTop: '20px',
    marginBottom: 0,
  },
});

const ShortStatisticsDialog = ({ progress, settings, isOpen, isWordsRemain }) => {
  const history = useHistory();
  const { rightAnswersStatistic, longestTodaySeries } = progress;
  const { newWordsPerDay, wordsPerDay } = settings;
  const rightAnswersToday = rightAnswersStatistic[0];

  const [open, setOpen] = useState(isOpen);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickContinue = () => {
    // setOpen(false);
    history.push(PATH.MAIN);
  };

  const handleClickSettings = () => {
    // setOpen(false);
    history.push(PATH.SETTINGS);
  };

  const ratingColor = classNames({
    [styles['ShortStatisticsDialog--fail']]: rightAnswersToday < RIGHT_ANSWER_SERIES.bad,
    [styles['ShortStatisticsDialog--bad']]:
      rightAnswersToday >= RIGHT_ANSWER_SERIES.bad &&
      rightAnswersToday < RIGHT_ANSWER_SERIES.normal,
    [styles['ShortStatisticsDialog--normal']]:
      rightAnswersToday >= RIGHT_ANSWER_SERIES.normal &&
      rightAnswersToday < RIGHT_ANSWER_SERIES.good,
    [styles['ShortStatisticsDialog--good']]:
      rightAnswersToday >= RIGHT_ANSWER_SERIES.good &&
      rightAnswersToday < RIGHT_ANSWER_SERIES.excellent,
    [styles['ShortStatisticsDialog--excellent']]: rightAnswersToday > RIGHT_ANSWER_SERIES.excellent,
  });

  const longestSeriesClasses = classNames(styles['ShortStatisticsDialog--results'], ratingColor);

  const classes = useStyles();

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="form-dialog-title" align="center">
        Серия слов на сегодня завершена!
      </DialogTitle>
      <DialogContent dividers>
        <Typography align="center" gutterBottom>
          {`Карточек изучено сегодня: `}
          <span className={styles['ShortStatisticsDialog--results']}>{wordsPerDay}</span>
          {`. `}
        </Typography>
        <Typography align="center" gutterBottom>
          {`Правильные ответы: `}
          <span className={longestSeriesClasses}>{`${rightAnswersStatistic[0]}%`}</span>
          {`. `}
        </Typography>
        <Typography align="center" gutterBottom>
          {`Изучено новых слов: `}
          <span className={styles['ShortStatisticsDialog--results']}>{newWordsPerDay}</span>
          {`. `}
        </Typography>
        <Typography align="center" paragraph>
          {`Серия правильных ответов подряд: `}
          <span className={styles['ShortStatisticsDialog--results']}>{longestTodaySeries}</span>
          {`. `}
        </Typography>

        {isWordsRemain && <Divider />}
        {isWordsRemain && (
          <DialogContentText classes={classes}>
            Запланированные на сегодня слова закончились, но еще остались слова срочного повторения.
            Если слов оказалось мало, всегда можно увеличить лимит в настройках.
          </DialogContentText>
        )}
      </DialogContent>

      <DialogActions>
        <Grid>
          {isWordsRemain && (
            <Button onClick={handleClickSettings} color="primary">
              Настройки
            </Button>
          )}
          <Button onClick={handleClickContinue} color="primary">
            Продолжить
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

ShortStatisticsDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isWordsRemain: PropTypes.bool.isRequired,
  progress: PropTypes.objectOf(PropTypes.any).isRequired,
  settings: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ShortStatisticsDialog;
