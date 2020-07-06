import React, { useState, useEffect, useRef } from 'react';
import { Grid } from '@material-ui/core/';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import SavannaQuestion from '../../components/SavannaQuestion';
import SavannaAnswers from '../../components/SavannaAnswers';

import style from './SavannaPage.module.scss';

const answerArr = [];
const gameSpeed = 2000;

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
  const [lives, setLives] = useState(5);
  const [showResult, setShowResult] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const question = words[currentQuestion];

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
      if (answerArr.length === currentQuestion) {
        answerArr.push('нет ответа');
        setLives(lives - 1);
      }
      setAnswers(answerArr);
      endGame();
      setCurrentQuestion(nextQuestion);
    },
    isRunning ? gameSpeed : null
  );

  const gameStart = () => {
    setIsRunning(true);
  };

  const answerBtnClick = (answer) => {
    if (answer !== question.isCorrectTranslation) {
      setLives(lives - 1);
    }
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
          {lives}
          Жизни
        </span>
        <SavannaQuestion word={question.word} />
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
