import React, { useState, useEffect, useRef } from 'react';
import Button from '../../components/Button';

import SavannaQuestion from '../../components/SavannaQuestion';
import SavannaAnswers from '../../components/SavannaAnswers';

import style from './SavannaPage.module.scss';

const answerArr = [];
const gameSpeed = 2000;
const questions = [
  {
    word: 'first',
  },
  {
    word: 'second',
  },
  {
    word: 'third',
  },
];

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

const SavannaPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [lives, setLives] = useState(5);
  const [showResult, setShowResult] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const endGame = () => {
    if (currentQuestion + 1 === questions.length) {
      setIsRunning(false);
      setShowResult(true);
    }
    if (lives < 2) {
      setIsRunning(false);
      setShowResult(true);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      return currentQuestion + 1;
    }
    return 5;
  };

  useInterval(
    () => {
      if (answerArr.length === currentQuestion) {
        answerArr.push('false');
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

  const question = questions[currentQuestion];

  const answerBtnClick = (answer) => {
    if (answer !== question.word) {
      setLives(lives - 1);
    }
    answerArr.push(answer);
    setAnswers(answerArr);
    endGame();
  };

  if (showResult) {
    return (
      <div>
        {answers.map((el, index) => {
          const key = index;
          let res = 'верно';
          if (el !== questions[key].word) {
            res = 'ошибка';
          }
          return <span key={`${el}+${key}`}>{`${el} ${res}`}</span>;
        })}
      </div>
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
        <SavannaAnswers
          answers={['first', 'second', 'third', '44']}
          handlerClick={answerBtnClick}
        />
      </div>
    );
  }
  return <Button handlerClick={gameStart} text="Начать игру" color="secondary" />;
};

export default SavannaPage;
