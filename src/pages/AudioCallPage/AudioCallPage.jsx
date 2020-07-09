import React, { useState } from 'react';
import PropTypes from 'prop-types';

import style from './AudioCallPage.module.scss';

const wordArr = [
  { word: 'puddle', wordTranslate: 'район', id: undefined, isCorrectTranslation: false },
  { word: 'observe', wordTranslate: 'наблюдать', id: undefined, isCorrectTranslation: true },
  { word: 'enter', wordTranslate: 'войти', id: undefined, isCorrectTranslation: true },
  { word: 'mail', wordTranslate: 'дразнить', id: undefined, isCorrectTranslation: false },
  { word: 'specific', wordTranslate: 'ползать', id: undefined, isCorrectTranslation: false },
  { word: 'secret', wordTranslate: 'сосать', id: undefined, isCorrectTranslation: false },
  { word: 'appear', wordTranslate: 'появляются', id: undefined, isCorrectTranslation: true },
  { word: 'condition', wordTranslate: 'поражение', id: undefined, isCorrectTranslation: false },
  { word: 'driveway', wordTranslate: 'отказаться', id: undefined, isCorrectTranslation: false },
  { word: 'image', wordTranslate: 'образ', id: undefined, isCorrectTranslation: true },
];

const AudioCallPage = ({ words }) => {
  console.log(words);
  const [index, setIndex] = useState(0);
  const collection = [];

  const clickApproveHandler = () => {
    setIndex(index + 1);
  };

  const createList = () => {
    const blockedIndex = [index];
    collection.push(wordArr[index]);

    for (let i = 0; i <= 4; i += 1) {
      let isFind = false;
      let randNum = Math.floor(Math.random() * wordArr.length) + index;
      while (!isFind) {
        if (!blockedIndex.includes(randNum)) {
          isFind = !isFind;
          blockedIndex.push(randNum);
        } else {
          randNum = Math.floor(Math.random() * wordArr.length) + index;
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

  return (
    <div className={style.AudioCallPage}>
      <div className={style.AudioCallPage__audio}>
        <div className={style['AudioCallPage__audio-icon']} />
      </div>
      <div className={style.AudioCallPage__examples}>
        {collection.map(({ word, wordTranslate }) => (
          <span className={style['AudioCallPage__examples-word']} key={word}>
            {wordTranslate}
          </span>
        ))}
      </div>
      <div className={style.AudioCallPage__next}>Не знаю</div>
    </div>
  );
};

AudioCallPage.propTypes = {
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AudioCallPage;
