import React, { useState, useEffect, useRef } from 'react';
import { Grid } from '@material-ui/core/';
import PropTypes from 'prop-types';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import WORD_HANDLER_KEYS from '../../constants/keys';
import wordHandler from '../../helpers/games-utils/wordHandler';
import Button from '../../components/Button';
import SavannaQuestion from '../../components/SavannaQuestion';
import SavannaAnswers from '../../components/SavannaAnswers';
import correctSound from '../../sounds/correct-answer.mp3';
import incorrectSound from '../../sounds/incorrect-sound.mp3';

import style from './SavannaPage.module.scss';

const GAME_SPEED = 5000;
const LIVES = [1, 2, 3, 4, 5];

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return undefined;
  }, [delay]);
}

const SavannaPage = ({ words, finallySendWordAndProgress }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [lives, setLives] = useState(LIVES.length);
  const [showResult, setShowResult] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [animation, setAnimation] = useState(true);
  const [speed, setSpeed] = useState(GAME_SPEED);
  const [showAnswers, setShowAnswers] = useState(true);

  const question = words[currentQuestion];
  let answerArr = [];
  const correctAnswerSound = new Audio(correctSound);
  const incorrectAnswerSound = new Audio(incorrectSound);

  const endGame = () => {
    if (currentQuestion + 1 === words.length) {
      setIsRunning(false);
      setShowResult(true);
    }
    if (lives < 1) {
      setIsRunning(false);
      setShowResult(true);
    }
  };

  const playSound = (sound) => {
    sound.play();
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < words.length) {
      return currentQuestion + 1;
    }
    return null;
  };

  const updateWordStatistic = (newDifficulty, newHighPrioryti) => {
    const options = [
      { key: WORD_HANDLER_KEYS.difficulty, value: newDifficulty },
      { key: WORD_HANDLER_KEYS.isHighPriority, value: newHighPrioryti },
    ];
    const preparedWord = wordHandler(question.originalWordObject, options);
    finallySendWordAndProgress(preparedWord);
  };

  useInterval(
    () => {
      setShowAnswers(true);
      if (answers.length === currentQuestion) {
        answerArr = answers;
        answerArr.push('нет ответа');
        updateWordStatistic(10, true);
        setLives(lives - 1);
        setAnswers(answerArr);
      }
      setAnimation(true);
      setSpeed(GAME_SPEED);
      endGame();
      setCurrentQuestion(nextQuestion);
    },
    isRunning ? speed : null
  );

  const gameStart = () => {
    setIsRunning(true);
    setShowResult(false);
    answerArr = [];
    setLives(LIVES.length);
  };

  const answerBtnClick = (answer) => {
    setShowAnswers(false);
    if (answer !== question.isCorrectTranslation) {
      updateWordStatistic(10, true);
      playSound(incorrectAnswerSound);
      setLives(lives - 1);
    } else {
      playSound(correctAnswerSound);
      updateWordStatistic(-10, false);
    }
    // слово отвечено правильно
    answerArr = answers;
    answerArr.push(answer);
    setAnswers(answerArr);
    setSpeed(1000);
    setAnimation(false);
    endGame();
  };

  return (
    <div className={style.Savanna}>
      {showResult && (
        <div className={style.Savanna__results}>
          <Grid container direction="column" justify="space-around" alignItems="center">
            {answers.map((el, index) => {
              const key = index;
              if (el !== words[index].isCorrectTranslation) {
                return (
                  <span className={style.Savanna__answers_wrong} key={`${el}+${key}`}>
                    {`${el} - ${words[index].word} - ошибка`}
                  </span>
                );
              }
              return (
                <span className={style.Savanna__answers_right} key={`${el}+${key}`}>
                  {`${el} - ${words[index].word} - правильно`}
                </span>
              );
            })}
          </Grid>
        </div>
      )}

      {isRunning && (
        <div className={style.Savanna__wrapper}>
          <span className={style.Savanna__lives}>
            {LIVES.map((element, index) => {
              return index < lives ? (
                <FavoriteIcon key={`livesIcon${element}`} color="secondary" />
              ) : (
                <FavoriteBorderIcon key={`livesIcon${element}`} color="secondary" />
              );
            })}
          </span>
          <SavannaQuestion word={question.word} animation={animation} />
          {showAnswers && (
            <SavannaAnswers answers={question.wordTranslate} handlerClick={answerBtnClick} />
          )}
        </div>
      )}

      {!isRunning && !showResult && (
        <Grid container direction="column" justify="center" alignItems="center">
          <Button handlerClick={gameStart} text="Начать игру" color="secondary" />
        </Grid>
      )}
    </div>
  );
};

SavannaPage.propTypes = {
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
  finallySendWordAndProgress: PropTypes.func.isRequired,
};

SavannaPage.propTypes = {
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SavannaPage;
