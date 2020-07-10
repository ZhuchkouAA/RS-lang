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

const GamesStatisticsDialog = ({ isOpen, words, gamePath }) => {
  const history = useHistory();

  const [open, setOpen] = useState(isOpen);

  const rightAnswers = words.filter(({ isRight }) => isRight);
  const badAnswers = words.filter(({ isRight }) => !isRight);
  const goodWords = rightAnswers.map(({ optional }, index) => {
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

  const badWords = badAnswers.map(({ optional }, index) => {
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

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickContinue = () => {
    history.push(PATH.MAIN);
  };

  const handleClickSettings = () => {
    history.push(gamePath);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="form-dialog-title" align="center">
        Результаты игры
      </DialogTitle>
      <DialogContent dividers>
        <Box className={styles.GamesStatisticsDialog__wrapper}>
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
        </Box>
      </DialogContent>

      <DialogActions>
        <Grid>
          <Button onClick={handleClickSettings} color="primary">
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

GamesStatisticsDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
  gamePath: PropTypes.string.isRequired,
};

export default GamesStatisticsDialog;
