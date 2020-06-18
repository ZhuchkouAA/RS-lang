import React from 'react';
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
  wordTranslate: 'инструктирует',
  transcription: '[instrʌ́kt]',
  textMeaning: 'To <i>instruct</i> is to teach.',
  textExample: 'My teacher <b>instructs</b> us in several subjects.',
  textExampleTranslate: 'Мой учитель учит нас нескольким предметам',
  textMeaningTranslate: 'Обучать - значит учить',
};

const PICTURE_URL =
  'https://raw.githubusercontent.com/not-SAINT/rslang-data/master/files/04_0070.jpg';

const WordCard = () => {
  const {
    word,
    wordTranslate,
    transcription,
    textExample,
    textExampleTranslate,
    textMeaning,
    textMeaningTranslate,
  } = cardState;

  return (
    <Card className={styles.WordCard__wrapper}>
      <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
        <Grid item className={styles.WordCard__header}>
          <CardMedia
            className={styles.WordCard__image}
            image={PICTURE_URL}
            title="Изучаемое слово"
          />
        </Grid>
        <Grid item>
          <div>
            <Typography className={styles.WordCard__word} gutterBottom variant="h6">
              {wordTranslate}
            </Typography>
            <Typography className={styles.WordCard__word} gutterBottom variant="h6">
              {transcription}
            </Typography>
          </div>
        </Grid>
      </Grid>

      <CardContent className={styles.WordCard__content}>
        <Box mb={2}>
          <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
            <Grid item>
              <Tooltip title="Добавить слово в 'Сложные'" aria-label="add">
                <Fab color="primary" size="small">
                  <AddIcon />
                </Fab>
              </Tooltip>
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
        <SentenceWithWord word={word} sentence={textExample} />
        <Typography
          className={styles.WordCard__text}
          variant="body1"
          color="textSecondary"
          component="p"
          gutterBottom
        >
          {textExampleTranslate}
        </Typography>
        <SentenceWithWord word={word} sentence={textMeaning} />
        <Typography
          className={styles.WordCard__text}
          variant="body1"
          color="textSecondary"
          component="p"
          gutterBottom
        >
          {textMeaningTranslate}
        </Typography>
      </CardContent>

      <CardActions>
        <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
          <Grid item>
            <Button variant="contained" color="secondary">
              Показать ответ
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
              Следующее слово
            </Button>
          </Grid>
        </Grid>
        <Box position="absolute">
          <Tooltip title="Удалить слово из изучения">
            <IconButton aria-label="delete">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
};

export default WordCard;
