import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, Button, Typography, Tab, Tabs } from '@material-ui/core';
import { LooksOne, LooksTwo, Looks3, Looks4, Looks5, Looks6, Mic } from '@material-ui/icons';
import classNames from 'classnames';

import styles from './SpeakIt.module.scss';
import getSpeechRecognition from './speech';
import { getQueueMiniGame10 } from '../../helpers/games-utils/createQueueMiniGame';
import Loader from '../Loader';
import defaultImage from '../../img/speakIt.jpg';
import winner from '../../sounds/winner.mp3';
import correct from '../../sounds/correct.mp3';

const playAudio = (url) => {
  const audio = new Audio();
  audio.src = url;
  audio.play();
};
const speechRec = getSpeechRecognition();

const getWords = async (level = 0) => {
  const path = 'https://raw.githubusercontent.com/zhuchkouaa/rslang-data/master/';
  const res = await getQueueMiniGame10(level);
  return res.map((element) => {
    const obj = {};
    obj.audio = path + element.optional.audio;
    obj.image = path + element.optional.image;
    obj.word = element.optional.word;
    obj.wordTranslate = element.optional.wordTranslate;
    obj.transcription = element.optional.transcription;
    obj.defaultWord = element;
    obj.isGuested = false;
    obj.isShow = false;
    return obj;
  });
};

let truthAnswers = [];

const SpeakIt = () => {
  const [value, setValue] = useState(0);
  const [inputText, setInputText] = useState('');
  const [wordsImage, setWordImage] = useState('');
  const [isStartGame, setStartGame] = useState(false);
  const [wordsExample, setWordExample] = useState([]);
  const [isShowStatistic, setShowStatistic] = useState(false);
  const [isWin, setWin] = useState(false);

  const handleWordExample = (lvl) => {
    getWords(lvl).then((val) => setWordExample(val));
  };
  useEffect(() => {
    handleWordExample();
  }, []);

  const handleWordsImage = (url) => {
    setWordImage(url);
  };

  useEffect(() => {
    handleWordsImage(defaultImage);
  }, []);
  const handleInputText = (newValue) => {
    setInputText(newValue);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleWordExample(newValue);
    handleWordsImage(defaultImage);
    handleInputText('');
    setStartGame(false);
  };

  const handleStartGame = (start) => {
    if (start && !isStartGame) {
      speechRec.start();
      speechRec.onresult = (event) => {
        const result = event.results[event.results.length - 1][0].transcript.toLowerCase();
        handleInputText(result);
      };
      speechRec.onend = () => {
        truthAnswers = wordsExample.filter((elem) => elem.isGuested);
        speechRec.start();
        if (truthAnswers.length > 0) {
          truthAnswers = truthAnswers.map((elem) => {
            const word = elem;
            if (!word.isShow) {
              handleWordsImage(elem.image);
              playAudio(correct);
              word.isShow = !word.isShow;
            }
            return word;
          });
        }

        if (truthAnswers.length === 10) {
          handleStartGame(false);
          setShowStatistic(true);
          setWin(true);
          playAudio(winner);
          setStartGame(false);
        }
      };
    }

    if (!start) {
      speechRec.stop();
      speechRec.onend = () => false;
    }
  };

  useEffect(() => {
    setWordExample(
      wordsExample.map((el) => {
        const word = el;
        if (el.word === inputText) {
          word.isGuested = true;
        }
        return word;
      })
    );
  }, [inputText]);

  return (
    <Card className={styles.SpeakIt}>
      {wordsExample.length === 0 ? (
        <Loader />
      ) : (
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
            {isStartGame && <Mic className={styles.SpeakIt__micro} />}
            <Typography>{inputText}</Typography>
          </Card>
          <Card className={styles.SpeakIt__containWords}>
            {wordsExample.map((element) => {
              const isGuested = element.word === inputText || element.isGuested;

              return (
                <Card
                  className={classNames({
                    [styles.SpeakIt__item]: true,
                    [styles.SpeakIt__item_true]: isStartGame && isGuested,
                  })}
                  key={Math.random()}
                  onClick={(e) => {
                    if (!isStartGame) {
                      playAudio(element.audio, e);
                      handleInputText(element.wordTranslate);
                      handleWordsImage(element.image);
                    }
                  }}
                >
                  <Typography className={styles.SpeakIt__item__word}>{element.word}</Typography>
                  <Typography>{element.transcription}</Typography>
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
                  setStartGame(false);
                  handleStartGame(false);
                  handleInputText('');
                  handleWordsImage(defaultImage);
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
                  setStartGame(true);
                  handleWordsImage(defaultImage);
                  handleInputText('');
                  handleStartGame(true);
                }}
              >
                Старт
              </Button>
            </Card>
            <Card className={styles.SpeakIt__button}>
              <Button
                variant="contained"
                onClick={() => {
                  setShowStatistic(true);
                }}
              >
                Статистика
              </Button>
            </Card>
          </Grid>
        </Grid>
      )}
      {isShowStatistic && (
        <Card className={styles.SpeakIt__statistic}>
          <Card className={styles.SpeakIt__statistic__answers}>
            <Card className={styles.SpeakIt__statistic__answers__item}>
              <Typography variant="h6" align="center">
                Знаю
              </Typography>
              {wordsExample.map((elem) => {
                if (elem.isGuested) {
                  return (
                    <Card
                      onClick={() => playAudio(elem.audio)}
                      key={Math.random()}
                      className={styles.SpeakIt__statistic__word}
                    >
                      <Typography>{elem.word}</Typography>
                      <Typography>{elem.transcription}</Typography>
                    </Card>
                  );
                }
                return <div />;
              })}
            </Card>
            <Card className={styles.SpeakIt__statistic__answers__item}>
              <Typography variant="h6" align="center">
                Нужно повторить
              </Typography>
              {wordsExample.map((elem) => {
                if (!elem.isGuested) {
                  return (
                    <Card
                      onClick={() => playAudio(elem.audio)}
                      key={Math.random()}
                      className={styles.SpeakIt__statistic__word}
                    >
                      <Typography>{elem.word}</Typography>
                      <Typography>{elem.transcription}</Typography>
                    </Card>
                  );
                }
                return <div />;
              })}
            </Card>
          </Card>

          {!isWin ? (
            <Card className={styles.SpeakIt__statistic__control}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setShowStatistic(false);
                  handleWordExample(value);
                  truthAnswers = [];
                  handleWordsImage(defaultImage);
                  handleStartGame(false);
                  setStartGame(false);
                }}
              >
                Другие слова
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setShowStatistic(false);
                  if (truthAnswers === 10) {
                    truthAnswers = [];
                  }
                }}
              >
                Продолжить
              </Button>
            </Card>
          ) : (
            <Card className={styles.SpeakIt__statistic__control}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setShowStatistic(false);
                  handleWordExample(value);
                  truthAnswers = [];
                  handleWordsImage(defaultImage);
                  handleStartGame(false);
                  setWin(false);
                  setStartGame(false);
                  setInputText('');
                }}
              >
                Вернуться
              </Button>
            </Card>
          )}
        </Card>
      )}
    </Card>
  );
};

export default SpeakIt;
