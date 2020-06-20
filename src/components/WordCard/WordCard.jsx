import React from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  Card,
  Box,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
  Tooltip,
  Fab,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';

import WordInput from '../WordInput';
import SentenceWithWord from '../SentenceWithWord';

import styles from './WordCard.module.scss';

const cardState = {
  word: 'instruct',
  image: true,
  wordTranslateText: 'инструктирует',
  transcriptionText: '[instrʌ́kt]',
  textMeaningText: 'To <i>instruct</i> is to teach.',
  textExampleText: 'My teacher <b>instructs</b> us in several subjects.',
  textExampleTranslateText: 'Мой учитель учит нас нескольким предметам',
  PICTURE_URL: 'https://raw.githubusercontent.com/not-SAINT/rslang-data/master/files/04_0070.jpg',
};

const WordCard = ({ settings }) => {
  const {
    answerBtn,
    delFromLearnBtn,
    feedBackButtons,
    image,
    // audio,
    // audioMeaning,
    // audioExample,
    textMeaning,
    textExample,
    transcription,
    wordTranslate,
    textExampleTranslate,
  } = settings;
  const {
    word,
    wordTranslateText,
    transcriptionText,
    textExampleText,
    textExampleTranslateText,
    textMeaningText,
    PICTURE_URL,
  } = cardState;

  return (
    <Card className={styles.WordCard__wrapper}>
      <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
        <Grid item className={styles.WordCard__header}>
          {image && (
            <CardMedia
              className={styles.WordCard__image}
              image={PICTURE_URL}
              title="Изучаемое слово"
            />
          )}
        </Grid>
        <Grid item>
          <div>
            {wordTranslate && (
              <Typography className={styles.WordCard__word} gutterBottom variant="h6">
                {wordTranslateText}
              </Typography>
            )}
            {transcription && (
              <Typography className={styles.WordCard__word} gutterBottom variant="h6">
                {transcriptionText}
              </Typography>
            )}
          </div>
        </Grid>
      </Grid>

      <CardContent className={styles.WordCard__content}>
        <Box mb={2}>
          <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
            <Grid item>
              {feedBackButtons && (
                <Tooltip title="Добавить слово в 'Сложные'" aria-label="add">
                  <Fab color="primary" size="small">
                    <AddIcon />
                  </Fab>
                </Tooltip>
              )}
            </Grid>
            <Grid item>
              <WordInput word={word} />
            </Grid>
            <Grid item>
              <Tooltip title="Проверить слово" aria-label="add">
                <Fab color="primary" size="small">
                  <CheckIcon />
                </Fab>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
        {textExample && <SentenceWithWord word={word} sentence={textExampleText} />}
        {textExampleTranslate && (
          <Typography
            className={styles.WordCard__text}
            variant="body1"
            color="textSecondary"
            component="p"
            gutterBottom
          >
            {textExampleTranslateText}
          </Typography>
        )}
        {textMeaning && <SentenceWithWord word={word} sentence={textMeaningText} />}
      </CardContent>

      <CardActions>
        <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
          <Grid item>
            {answerBtn && (
              <Button variant="contained" color="secondary">
                Показать ответ
              </Button>
            )}
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
              Следующее слово
            </Button>
          </Grid>
        </Grid>
        {delFromLearnBtn && (
          <Box position="absolute">
            <Tooltip title="Удалить слово из изучения">
              <IconButton aria-label="delete">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

WordCard.propTypes = {
  settings: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.string])).isRequired,
};
export default WordCard;
