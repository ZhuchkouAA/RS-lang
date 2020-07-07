import React, { useState, useEffect, useRef } from 'react';
import { Grid } from '@material-ui/core/';
import PropTypes from 'prop-types';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import Button from '../../components/Button';
import SavannaQuestion from '../../components/SavannaQuestion';
import SavannaAnswers from '../../components/SavannaAnswers';

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

  const question = words[currentQuestion];
  const answerArr = [];

  const endGame = () => {
    if (currentQuestion + 1 === words.length) {
      setIsRunning(false);
      setShowResult(true);
    }
    if (lives < 2) {
      setIsRunning(false);
      setShowResult(true);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < words.length) {
      return currentQuestion + 1;
    }
    return null;
  };

  useInterval(
    () => {
      setAnimation(true);
      if (answerArr.length === currentQuestion) {
        answerArr.push('нет ответа');
        setLives(lives - 1);
      }
      setAnswers(answerArr);
      endGame();
      setCurrentQuestion(nextQuestion);
    },
    isRunning ? GAME_SPEED : null
  );

  const gameStart = () => {
    setIsRunning(true);
  };

  const answerBtnClick = (answer) => {
    if (answer !== question.isCorrectTranslation) {
      setLives(lives - 1);
    }
    setAnimation(false);
    answerArr.push(answer);
    setAnswers(answerArr);
    endGame();
  };

  if (showResult) {
    return (
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
    );
  }
  if (isRunning) {
    return (
      <div className={style.Savanna}>
        <span>
          {LIVES.map((element, index) => {
            return index < lives ? (
              <FavoriteIcon key={`livesIcon${element}`} color="secondary" />
            ) : (
              <FavoriteBorderIcon key={`livesIcon${element}`} color="secondary" />
            );
          })}
        </span>
        <SavannaQuestion word={question.word} animation={animation} />
        <SavannaAnswers answers={question.wordTranslate} handlerClick={answerBtnClick} />
      </div>
    );
  }
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Button handlerClick={gameStart} text="Начать игру" color="secondary" />
    </Grid>
  );
};

SavannaPage.propTypes = {
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SavannaPage;
