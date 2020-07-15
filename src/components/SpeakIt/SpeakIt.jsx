import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, Button, Typography } from '@material-ui/core';
import { Mic } from '@material-ui/icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import PATHS from '../../constants/path';
import styles from './SpeakIt.module.scss';
import getSpeechRecognition from './speech';
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

let truthAnswers = [];

const SpeakIt = ({ wordsForGame }) => {
  const [inputText, setInputText] = useState('');
  const [wordsImage, setWordImage] = useState('');
  const [isStartGame, setStartGame] = useState(false);
  const [wordsExample, setWordExample] = useState(wordsForGame);
  const [isShowStatistic, setShowStatistic] = useState(false);
  const [isWin, setWin] = useState(false);

  const handleWordsImage = (url) => {
    setWordImage(url);
  };

  useEffect(() => {
    handleWordsImage(defaultImage);
  }, []);
  const handleInputText = (newValue) => {
    setInputText(newValue);
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
              <NavLink to={PATHS.GAME_START_SCREEN} className={styles.SpeakIt__nav}>
                <Button variant="contained" color="secondary">
                  Новая игра
                </Button>
              </NavLink>
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
              <NavLink to={PATHS.GAME_START_SCREEN} className={styles.SpeakIt__nav}>
                <Button variant="contained" color="secondary">
                  Новая игра
                </Button>
              </NavLink>
            </Card>
          )}
        </Card>
      )}
    </Card>
  );
};

SpeakIt.propTypes = {
  wordsForGame: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SpeakIt;
