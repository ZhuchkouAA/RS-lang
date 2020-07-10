import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { IconButton } from '@material-ui/core';
import { VolumeUp } from '@material-ui/icons';

import correctSound from '../../sounds/correct-answer.mp3';
import incorrectSound from '../../sounds/incorrect-sound.mp3';
import style from './AudioCallPage.module.scss';

const wordArr = [
  { word: 'golf', wordTranslate: 'гольф', id: undefined, isCorrectTranslation: false },
  { word: 'magic', wordTranslate: 'магия', id: undefined, isCorrectTranslation: false },
  { word: 'planet', wordTranslate: 'планета', id: undefined, isCorrectTranslation: false },
  { word: 'hunger', wordTranslate: 'голод', id: undefined, isCorrectTranslation: true },
  { word: 'life', wordTranslate: 'жизнь', id: undefined, isCorrectTranslation: false },
  { word: 'banana', wordTranslate: 'банан', id: undefined, isCorrectTranslation: false },
  { word: 'cheer', wordTranslate: 'поболеть', id: undefined, isCorrectTranslation: true },
  // { word: 'prize', wordTranslate: 'приз', id: undefined, isCorrectTranslation: false },
  // { word: 'sport', wordTranslate: 'спорт', id: undefined, isCorrectTranslation: true },
  // { word: 'participant', wordTranslate: 'участник', id: undefined, isCorrectTranslation: true },
];

const correctAnswerSound = new Audio(correctSound);
correctAnswerSound.volume = 0.5;
const incorrectAnswerSound = new Audio(incorrectSound);
incorrectAnswerSound.volume = 0.5;

const answers = [];

const AudioCallPage = ({ words }) => {
  const [index, setIndex] = useState(0);
  const collection = [];

  const createList = () => {
    const blockedIndex = [index];
    collection.push(wordArr[index]);

    for (let i = 0; i <= 4; i += 1) {
      let isFind = false;
      let randNum = Math.floor(Math.random() * wordArr.length);
      while (!isFind) {
        if (!blockedIndex.includes(randNum)) {
          isFind = !isFind;
          blockedIndex.push(randNum);
        } else {
          randNum = Math.floor(Math.random() * wordArr.length);
        }
      }

      collection.push(wordArr[randNum]);
    }

    for (let i = 0; i <= 5; i += 1) {
      const randPos = Math.floor(Math.random() * (5 - i));
      const currentPos = collection[i];

      collection[i] = collection[randPos];
      collection[randPos] = currentPos;
    }
  };
  createList();

  const handlerClickPlayAudio = () => {
    // const audio = Audio(words[index].audio);
    // audio.play();
  };

  const handlerClickAnswerWord = (event) => {
    const chosenWord = event.target.innerHTML;
    const condition = wordArr[index].wordTranslate === chosenWord;

    if (condition) {
      correctAnswerSound.play();
    } else {
      incorrectAnswerSound.play();
    }

    answers.push({
      word: wordArr[index].word,
      isGuessed: condition,
    });
    setIndex(index + 1);
  };

  const handlerClickSkipWord = () => {
    setIndex(index + 1);
  };

  const gameHtml = (
    <>
      <div className={style.AudioCallPage__audio}>
        <div className={style['AudioCallPage__audio-icon']}>
          <IconButton aria-label="mute" onClick={() => handlerClickPlayAudio()}>
            <VolumeUp fontSize="large" />
          </IconButton>
        </div>
      </div>
      <div className={style.AudioCallPage__examples}>
        {!(wordArr.length === index) &&
          collection.map(({ word, wordTranslate }) => (
            <button
              className={style['AudioCallPage__examples-word']}
              type="button"
              key={word}
              onClick={(event) => handlerClickAnswerWord(event)}
            >
              {wordTranslate}
            </button>
          ))}
      </div>
      <button
        className={style.AudioCallPage__next}
        type="button"
        onClick={() => handlerClickSkipWord()}
      >
        Не знаю
      </button>
    </>
  );

  const resultHtml = answers.map(({ word, isGuessed }) => (
    <div key={word}>{`${word} / ${isGuessed}`}</div>
  ));

  return (
    <div className={style.AudioCallPage}>{wordArr.length === index ? resultHtml : gameHtml}</div>
  );
};

AudioCallPage.propTypes = {
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AudioCallPage;
