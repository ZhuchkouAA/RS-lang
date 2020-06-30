import React, { useState } from 'react';

import SavannaQuestion from '../../components/SavannaQuestion';
import SavannaAnswers from '../../components/SavannaAnswers';

import style from './SavannaPage.module.scss';

const SavannaPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      id: 1,
      question: 'Which statement about Hooks is not true?',
    },
    {
      id: 2,
      question: 'Which one is not a Hook?',
    },
    {
      id: 3,
      question: 'What Hook should be used for data fetching?',
    },
  ];

  const nextQuestion = () =>
    currentQuestion + 1 < questions.length ? currentQuestion + 1 : currentQuestion;

  const timerId = setInterval(() => setCurrentQuestion(nextQuestion), 5000);
  setTimeout(() => clearInterval(timerId), 20000);

  const question = questions[currentQuestion];

  return (
    <div className={style.Savanna}>
      <SavannaQuestion word={question.question} />
      <SavannaAnswers answers={['123', 'asd', 'asd', 'qwe']} />
    </div>
  );
};

export default SavannaPage;
