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
import { getRatingColorStyleName } from '../../helpers/repeat-logic-utils';
import { getCategoryPassedPercent } from '../../helpers/getProgress-utils';

import styles from './ShortStatisticsDialog.module.scss';

const useStyles = makeStyles({
  root: {
    marginBottom: 0,
    marginTop: '20px',
  },
});

const ShortStatisticsDialog = ({ progress, isOpen, isWordsRemain }) => {
  const history = useHistory();
  const [open, setOpen] = useState(isOpen);
  const {
    rightAnswersStatistic,
    cardsShowedStatistic,
    longestTodaySeries,
    newCardsShowedStatistic,
  } = progress;

  const rightAnswersTodayPercent = getCategoryPassedPercent(
    rightAnswersStatistic[0],
    cardsShowedStatistic[0]
  );
  const longestSeriaPersent = getCategoryPassedPercent(longestTodaySeries, cardsShowedStatistic[0]);
  const answerRatingColor = getRatingColorStyleName(rightAnswersTodayPercent);
  const seriesRatingColor = getRatingColorStyleName(longestSeriaPersent);

  const answerClasses = classNames(
    styles['ShortStatisticsDialog--results'],
    styles[answerRatingColor]
  );
  const longestSeriesClasses = classNames(
    styles['ShortStatisticsDialog--results'],
    styles[seriesRatingColor]
  );

  const classes = useStyles();

  const handleClose = () => {
    if (isWordsRemain) {
      return setOpen(false);
    }

    return history.push(PATH.MAIN);
  };

  const handleClickContinue = () => {
    setOpen(false);
  };

  const handleClickToMain = () => {
    history.push(PATH.MAIN);
  };

  const handleClickSettings = () => {
    history.push(PATH.SETTINGS);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="form-dialog-title" align="center">
        Запланированные на сегодня слова пройдены!
      </DialogTitle>
      <DialogContent dividers>
        <Typography align="center" gutterBottom>
          {`Слов пройдено сегодня: `}
          <span className={styles['ShortStatisticsDialog--results']}>
            {cardsShowedStatistic[0]}
          </span>
          {`. `}
        </Typography>
        <Typography align="center" gutterBottom>
          {`Пройдено новых слов: `}
          <span className={styles['ShortStatisticsDialog--results']}>
            {newCardsShowedStatistic[0]}
          </span>
          {`. `}
        </Typography>
        <Typography align="center" gutterBottom>
          {`Правильные ответы: `}
          <span className={answerClasses}>{`${rightAnswersTodayPercent}%`}</span>
          {`. `}
        </Typography>

        <Typography align="center" paragraph>
          {`Серия правильных ответов подряд: `}
          <span className={longestSeriesClasses}>{longestTodaySeries}</span>
          {`. `}
        </Typography>

        {isWordsRemain && <Divider />}
        {isWordsRemain && (
          <DialogContentText classes={classes}>
            Запланированные на сегодня слова закончились, но еще остались слова срочного повторения.
            Если слов оказалось мало, всегда можно увеличить лимит в настройках. Или продолжить
            изучение в играх.
          </DialogContentText>
        )}
      </DialogContent>

      <DialogActions>
        <Grid>
          <Button onClick={handleClickSettings} color="primary">
            Настройки
          </Button>
          <Button onClick={handleClickToMain} color="primary">
            На главную
          </Button>
          {isWordsRemain && (
            <Button onClick={handleClickContinue} color="primary">
              Продолжить
            </Button>
          )}
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

ShortStatisticsDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isWordsRemain: PropTypes.bool.isRequired,
  progress: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ShortStatisticsDialog;
