/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
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

import styles from './SpeechRecognition.module.scss';

const propTypes = {
  transcript: PropTypes.string.isRequired,
  startListening: PropTypes.func.isRequired,
  stopListening: PropTypes.func.isRequired,
  browserSupportsSpeechRecognition: PropTypes.bool.isRequired,
};

const options = {
  autoStart: false,
};

const playAudio = (url) => {
  const audio = new Audio();
  audio.src = url;
  audio.play();
};

const Dictaphone = ({
  transcript,
  startListening,
  stopListening,
  browserSupportsSpeechRecognition,
  recognition,
}) => {
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

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  recognition.lang = 'en-US';
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <Card className={styles.SpeakIt}>
      <Grid item className={styles.SpeakIt__wrapper}>
        <Tabs variant="scrollable" value={value} onChange={handleChange} aria-label="levels">
          <Tab icon={<LooksOne />} aria-label="one" />
          <Tab icon={<LooksTwo />} aria-label="two" />
          <Tab icon={<Looks3 />} aria-label="three" />
          <Tab icon={<Looks4 />} aria-label="four" />
          <Tab icon={<Looks5 />} aria-label="five" />
          <Tab icon={<Looks6 />} aria-label="six" />
        </Tabs>
        <CardMedia image={cardExample.PICTURE_URL} className={styles.SpeakIt__image} />
        <Card className={styles.SpeakIt__word}>
          <Mic />
          <Typography>{transcript}</Typography>
        </Card>
        <Card className={styles.SpeakIt__containWords}>
          {wordsExample.map((element) => {
            return (
              <Card className={styles.SpeakIt__item}>
                <Audiotrack onClick={(e) => playAudio(element.AUDIO, e)} />
                <Typography>{element.word}</Typography>
                <Typography>{element.transcriptionText}</Typography>
              </Card>
            );
          })}
        </Card>
        <Grid className={styles.SpeakIt__control}>
          <Card className={styles.SpeakIt__button}>
            <Button variant="contained" color="secondary" onClick={stopListening}>
              Стоп
            </Button>
          </Card>
          <Card className={styles.SpeakIt__button}>
            <Button variant="contained" color="primary" onClick={startListening}>
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

Dictaphone.propTypes = propTypes;

export default SpeechRecognition(options)(Dictaphone);
