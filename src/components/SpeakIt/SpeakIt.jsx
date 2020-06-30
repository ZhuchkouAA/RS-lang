import React from 'react';
import { Grid, Card, CardMedia, Button, Typography, Tab, Tabs } from '@material-ui/core';
import {
  Audiotrack,
  LooksOne,
  LooksTwo,
  Looks3,
  Looks4,
  Looks5,
  Looks6,
  Mic,
} from '@material-ui/icons';

import styles from './SpeakIt.module.scss';

const SpeakIt = () => {
  const cardExample = {
    word: 'instruct',
    wordTranslateText: 'инструктирует',
    transcriptionText: '[instrʌ́kt]',
    PICTURE_URL:
      'https://raw.githubusercontent.com/zhuchkouaa/rslang-data/master/files/04_0070.jpg',
    AUDIO: 'https://raw.githubusercontent.com/zhuchkouaa/rslang-data/master/files/02_0621.mp3',
  };

  const wordsExample = [
    cardExample,
    cardExample,
    cardExample,
    cardExample,
    cardExample,
    cardExample,
    cardExample,
    cardExample,
    cardExample,
    cardExample,
  ];

  return (
    <Card className={styles.SpeakIt}>
      <Grid item className={styles.SpeakIt__wrapper}>
        <Tabs variant="scrollable">
          <Tab icon={<LooksOne />} />
          <Tab icon={<LooksTwo />} />
          <Tab icon={<Looks3 />} />
          <Tab icon={<Looks4 />} />
          <Tab icon={<Looks5 />} />
          <Tab icon={<Looks6 />} />
        </Tabs>
        <CardMedia image={cardExample.PICTURE_URL} className={styles.SpeakIt__image} />
        <Card className={styles.SpeakIt__word}>
          <Mic />
          <Typography> Что-то </Typography>
        </Card>
        <Card className={styles.SpeakIt__containWords}>
          {wordsExample.map((element) => {
            return (
              <Card className={styles.SpeakIt__item}>
                <Audiotrack />
                <Typography>{element.word}</Typography>
                <Typography>{element.transcriptionText}</Typography>
              </Card>
            );
          })}
        </Card>
        <Grid className={styles.SpeakIt__control}>
          <Card className={styles.SpeakIt__button}>
            <Button variant="contained" color="secondary">
              Стоп
            </Button>
          </Card>
          <Card className={styles.SpeakIt__button}>
            <Button variant="contained" color="primary">
              Старт
            </Button>
          </Card>
          <Card className={styles.SpeakIt__button}>
            <Button variant="contained">Статистика</Button>
          </Card>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SpeakIt;
