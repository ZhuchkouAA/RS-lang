import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

import WordInput from '../WordInput';

import styles from './WordCard.module.scss';

const cardState = {
  word: 'instruct',
  image: true,
  wordTranslate: 'инструктирует',
  transcription: '[instrʌ́kt]',
  textMeaning: 'To instruct is to teach.',
  textExample: 'My teacher instructs us in several subjects.',
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
      <div className={styles.WordCard__header}>
        <CardMedia
          className={styles.WordCard__image}
          image={PICTURE_URL}
          title="Contemplative Reptile"
        />

        <div>
          <Typography className={styles.WordCard__word} gutterBottom variant="h6">
            {wordTranslate}
          </Typography>
          <Typography className={styles.WordCard__word} gutterBottom variant="h6">
            {transcription}
          </Typography>
        </div>
      </div>

      <CardContent className={styles.WordCard__content}>
        <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
          <Grid item>
            <WordInput word={word} />
          </Grid>
          <Grid item>
            <Tooltip title="Удалить слово из изучения">
              <IconButton aria-label="delete">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>

        <Typography
          className={styles.WordCard__text}
          variant="body1"
          color="textPrimary"
          component="p"
          gutterBottom
        >
          {textExample}
        </Typography>
        <Typography
          className={styles.WordCard__text}
          variant="body1"
          color="textSecondary"
          component="p"
          gutterBottom
        >
          {textExampleTranslate}
        </Typography>
        <Typography
          className={styles.WordCard__text}
          variant="body1"
          color="textPrimary"
          component="p"
          gutterBottom
        >
          {textMeaning}
        </Typography>
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
      </CardActions>
    </Card>
  );
};

export default WordCard;
