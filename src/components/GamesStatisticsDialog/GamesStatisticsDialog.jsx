import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Grid,
  Button,
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from '@material-ui/core';

import IconMini from '../IconMini';
import PATH from '../../constants/path';
import URLS from '../../constants/APIUrls';

import styles from './GamesStatisticsDialog.module.scss';

const getWordsRows = (words) => {
  return words.map(({ optional }, index) => {
    const { word, wordTranslate, audio } = optional;
    const key = `GamesStatisticsDialog__${word}_${index}`;
    const audioUrl = `${URLS.ASSETS}${audio}`;

    return (
      <Typography
        key={key}
        align="center"
        variant="body1"
        color="textSecondary"
        component="p"
        gutterBottom
      >
        <IconMini srcUrl={audioUrl} />
        {` ${word} - ${wordTranslate}`}
      </Typography>
    );
  });
};

const GamesStatisticsDialog = ({ isOpen, words, score }) => {
  const history = useHistory();
  const [open, setOpen] = useState(isOpen);

  const rightAnswers = words.filter(({ isRight }) => isRight);
  const badAnswers = words.filter(({ isRight }) => !isRight);
  const skippedAnswers = words.filter(({ isSkip }) => isSkip);
  const goodWords = getWordsRows(rightAnswers);
  const badWords = getWordsRows(badAnswers);
  const skippedWords = getWordsRows(skippedAnswers);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickContinue = () => {
    history.push(PATH.MAIN);
  };

  const handleClickPlayAgain = () => {
    history.push(PATH.GAME_START_SCREEN);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="form-dialog-title" align="center">
        Результаты игры
      </DialogTitle>
      <DialogContent dividers>
        <Box className={styles.GamesStatisticsDialog__wrapper}>
          {score >= 0 && (
            <Typography variant="h6" align="center" gutterBottom>
              {`Твой результат: ${score} очков.`}
            </Typography>
          )}
          {badAnswers.length > 0 && (
            <>
              <Typography
                className={styles[`GamesStatisticsDialog__answer--bad`]}
                align="center"
                gutterBottom
              >
                {`Ошибочные ответы: `}
              </Typography>
              {badWords}
            </>
          )}
          {rightAnswers.length > 0 && (
            <>
              <Typography
                className={styles[`GamesStatisticsDialog__answer--good`]}
                align="center"
                gutterBottom
              >
                {`Правильные ответы: `}
              </Typography>
              {goodWords}
            </>
          )}
          {skippedAnswers.length > 0 && (
            <>
              <Typography
                className={styles[`GamesStatisticsDialog__answer--skipped`]}
                align="center"
                gutterBottom
              >
                {`Пропущенные ответы: `}
              </Typography>
              {skippedWords}
            </>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Grid>
          <Button onClick={handleClickPlayAgain} color="primary">
            Играть еще раз
          </Button>

          <Button onClick={handleClickContinue} color="primary">
            На главную
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

GamesStatisticsDialog.defaultProps = {
  score: -1,
};

GamesStatisticsDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
  score: PropTypes.number,
};

export default GamesStatisticsDialog;
