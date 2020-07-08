import React, { useState, useEffect, useRef } from 'react';
import { Grid } from '@material-ui/core/';
import PropTypes from 'prop-types';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import WORD_HANDLER_KEYS from '../../constants/keys';
import wordHandler from '../../helpers/games-utils/wordHandler';
import finallySendWordAndProgress from '../../middlewares/finallySendWordAndProgress';
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

const SavannaPage = ({ words }) => {
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

  useInterval(
    () => {
      setShowAnswers(true);
      if (answers.length === currentQuestion) {
        answerArr = answers;
        answerArr.push('нет ответа');
        const options = [
          { key: WORD_HANDLER_KEYS.difficulty, value: 1 },
          { key: WORD_HANDLER_KEYS.isHighPriority, value: true },
        ];
        const preparedWord = wordHandler(question.originalWordObject, options);
        finallySendWordAndProgress(preparedWord);
        setLives(lives - 1);
        setAnswers(answerArr);
      }
      setAnimation(true);
      setSpeed(5000);
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
      // слово отвечено неправильно
      playSound(incorrectAnswerSound);
      setLives(lives - 1);
    } else {
      playSound(correctAnswerSound);
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
        <Grid container direction="column" justify="space-around" alignItems="center">
          {answers.map((el, index) => {
            const key = index;
            let res = 'верно';
            if (el !== words[index].isCorrectTranslation) {
              res = 'ошибка';
            }
            return <span key={`${el}+${key}`}>{`${el} - ${words[index].word} - ${res}`}</span>;
          })}
        </Grid>
      )}

      {isRunning && (
        <div>
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
};

export default SavannaPage;
