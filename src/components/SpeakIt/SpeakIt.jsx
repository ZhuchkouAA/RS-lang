import React, { useState } from 'react';
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
import classNames from 'classnames';

import styles from './SpeakIt.module.scss';
import getSpeechRecognition from './speech';
// import { getQueueMiniGame10 } from '../../helpers/games-utils/createQueueMiniGame';

const playAudio = (url) => {
  const audio = new Audio();
  audio.src = url;
  audio.play();
};

// const getWords = (level) => {
//   let result;
//   async function getResult() {
//     const res = await getQueueMiniGame10(level);
//   }
// };

const SpeakIt = () => {
  const cardExample = {
    word: 'instruct',
    wordTranslateText: 'инструктирует',
    transcriptionText: '[instrʌ́kt]',
    PICTURE_URL:
      'https://raw.githubusercontent.com/zhuchkouaa/rslang-data/master/files/04_0070.jpg',
    AUDIO: 'https://raw.githubusercontent.com/zhuchkouaa/rslang-data/master/files/02_0623.mp3',
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

  const [value, setValue] = useState(0);
  const [inputText, setInputText] = useState('');
  const [wordsImage, setWordImage] = useState(cardExample.PICTURE_URL);
  const [isStartGame, setStartGame] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputText = (newValue) => {
    setInputText(newValue);
  };
  const speechRec = getSpeechRecognition(handleInputText);
  // const recoStart = () => {
  //   speechRec.start();
  // };
  const handleStartGame = (start) => {
    if (start && !isStartGame) {
      speechRec.start();
      setStartGame(start);
    }

    if (!start) {
      speechRec.abort();
      setStartGame(start);
    }
  };

  const handleWordsImage = (url) => {
    setWordImage(url);
  };

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
        <CardMedia image={wordsImage} className={styles.SpeakIt__image} />
        <Card className={styles.SpeakIt__word}>
          {isStartGame ? <Mic /> : false}
          <Typography>{inputText}</Typography>
        </Card>
        <Card className={styles.SpeakIt__containWords}>
          {wordsExample.map((element) => {
            return (
              <Card
                className={classNames({
                  [styles.SpeakIt__item]: true,
                  [styles.SpeakIt__item_true]: isStartGame && element.word === inputText,
                })}
                key={Math.random()}
                onClick={(e) => {
                  playAudio(element.AUDIO, e);
                  handleInputText(element.wordTranslateText);
                  handleWordsImage(element.PICTURE_URL);
                }}
              >
                <Audiotrack />
                <Typography className="word">{element.word}</Typography>
                <Typography>{element.transcriptionText}</Typography>
              </Card>
            );
          })}
        </Card>
        <Grid className={styles.SpeakIt__control}>
          <Card className={styles.SpeakIt__button}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                handleStartGame(false);
                handleInputText('');
              }}
            >
              Стоп
            </Button>
          </Card>
          <Card className={styles.SpeakIt__button}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleInputText('');
                handleStartGame(true);
              }}
            >
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
