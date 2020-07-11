import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { CardMedia, IconButton, Tooltip } from '@material-ui/core';
import { VolumeUp } from '@material-ui/icons';

import classNames from 'classnames';
import correctSound from '../../sounds/correct-answer.mp3';
import incorrectSound from '../../sounds/incorrect-sound.mp3';
import { playTrackList } from '../../helpers/playsound-utils';
import URLS from '../../constants/APIUrls';
import style from './AudioCallPage.module.scss';
import wordHandler from '../../helpers/games-utils/wordHandler';
import WORD_HANDLER_KEYS from '../../constants/keys';
import { DIFFICULTY_GAME_PENALTY } from '../../constants/variables-learning';

const correctAnswerSound = new Audio(correctSound);
correctAnswerSound.volume = 0.5;
const incorrectAnswerSound = new Audio(incorrectSound);
incorrectAnswerSound.volume = 0.5;

const answers = [];
const collection = [];

const AudioCallPage = ({ wordsForGame, wordsForRandom, finallySendWordAndProgress }) => {
  const [index, setIndex] = useState(0);
  const [isAudioPlaying, setAudioPlaying] = useState(false);
  const [isNewWord, setIsNewWord] = useState(true);
  const [isWordGuess, setWordGuess] = useState(false);
  const [isWordVisible, setWordVisible] = useState(false);

  const createList = () => {
    setIsNewWord(false);
    collection.length = 0;

    const blockedIndex = [index];
    collection.push(wordsForGame[index]);

    for (let i = 0; i <= 3; i += 1) {
      let isFind = false;
      let randNum = Math.floor(Math.random() * wordsForRandom.length);
      while (!isFind) {
        if (!blockedIndex.includes(randNum)) {
          isFind = !isFind;
          blockedIndex.push(randNum);
        } else {
          randNum = Math.floor(Math.random() * wordsForRandom.length);
        }
      }

      collection.push(wordsForRandom[randNum]);
    }

    for (let i = 0; i <= collection.length - 1; i += 1) {
      const randPos = Math.floor(Math.random() * (5 - i));
      const currentPos = collection[i];

      collection[i] = collection[randPos];
      collection[randPos] = currentPos;
    }
  };

  const startPlayingSound = () => {
    if (isAudioPlaying) {
      return;
    }

    const audioUrl = `${URLS.ASSETS}${wordsForGame[index].audio}`;

    setAudioPlaying(true);
    playTrackList([audioUrl], () => {
      setAudioPlaying(false);
    });
  };

  const answerCreate = (condition, chosenWord = false) => {
    answers.push({
      rightWord: wordsForGame[index].word,
      chosenWord,
      isGuessed: condition,
      wordDefault: wordsForGame[index].wordDefault,
    });
  };

  const newWordPrepare = () => {
    let preparedWord = [];
    if (!answers[answers.length - 1].isGuessed) {
      preparedWord = wordHandler(answers[answers.length - 1].wordDefault, [
        { key: WORD_HANDLER_KEYS.difficulty, value: DIFFICULTY_GAME_PENALTY },
        { key: WORD_HANDLER_KEYS.isHighPriority, value: true },
      ]);
    } else {
      preparedWord = wordHandler(answers[answers.length - 1].wordDefault, [
        { key: WORD_HANDLER_KEYS.difficulty, value: DIFFICULTY_GAME_PENALTY },
      ]);
    }
    finallySendWordAndProgress(preparedWord);

    setIndex(index + 1);
    setWordGuess(false);
    setIsNewWord(true);
  };

  if (isNewWord) {
    createList();
    startPlayingSound();
  }

  const handlerClickPlayAudio = () => {
    startPlayingSound();
  };

  const handlerClickAnswerWord = (event) => {
    if (isWordGuess) {
      return;
    }

    setWordGuess(true);
    setTimeout(() => {
      setWordVisible(true);
    }, 150);

    const chosenWord = event.target.innerHTML;
    const condition = wordsForGame[index].wordTranslate === chosenWord;
    answerCreate(condition, chosenWord);
  };

  const handlerClickSkipWord = () => {
    if (!isWordGuess) {
      setWordGuess(true);
      setTimeout(() => {
        setWordVisible(true);
      }, 150);

      const condition = 'skipped';
      answerCreate(condition);
      return;
    }

    newWordPrepare();
  };

  // HTML

  const imageClasses = classNames(style['AudioCallPage__header-container'], {
    [style['Block--hide']]: !isWordGuess,
    [style['Block--visibility']]: !isWordVisible,
  });

  const gameHtml = (
    <>
      <div className={style.AudioCallPage__header}>
        <div className={imageClasses}>
          <CardMedia
            className={style['AudioCallPage__header-image']}
            image={`${URLS.ASSETS}${wordsForGame[index].image}`}
            title="Изучаемое слово"
          />
          <div className={style['AudioCallPage__header-translate']}>{wordsForGame[index].word}</div>
          <div className={style['AudioCallPage__header-transcription']}>
            {wordsForGame[index].transcription}
          </div>
        </div>
        <div className={style['AudioCallPage__header-audio']}>
          <div className={style['AudioCallPage__audio-icon']}>
            <Tooltip title="Произнести слово" aria-label="add" enterDelay={1000}>
              <IconButton aria-label="mute" onClick={handlerClickPlayAudio}>
                <VolumeUp fontSize="large" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className={style.AudioCallPage__examples}>
        {!(wordsForGame.length === index) &&
          collection.map(({ word, wordTranslate }, i) => {
            const checkWordCondition = () => {
              let wordCondition = 'skipped';

              switch (answers[answers.length - 1].isGuessed) {
                case false:
                  if (wordTranslate === answers[answers.length - 1].chosenWord) {
                    wordCondition = 'wrong';
                  } else if (word === wordsForGame[index].word) {
                    wordCondition = 'right';
                  }
                  break;
                case true:
                  if (word === wordsForGame[index].word) {
                    wordCondition = 'right';
                  }
                  break;
                default:
                  if (word === wordsForGame[index].word) {
                    wordCondition = 'right';
                  }
                  break;
              }

              return wordCondition;
            };

            const stateClass = classNames(style['AudioCallPage__examples-button'], {
              [style[
                `AudioCallPage__examples-button--${isWordGuess && checkWordCondition()}`
              ]]: isWordGuess,
              [style['AudioCallPage__examples-button--off']]: isWordGuess,
            });

            return (
              <button
                className={stateClass}
                type="button"
                key={word}
                onClick={(event) => handlerClickAnswerWord(event)}
              >
                <span className={style['AudioCallPage__examples-index']}>{`${i + 1})`}</span>
                <span className={style['AudioCallPage__examples-word']}>{wordTranslate}</span>
              </button>
            );
          })}
      </div>
      <button
        className={style.AudioCallPage__next}
        type="button"
        onClick={() => handlerClickSkipWord()}
      >
        {isWordGuess ? 'Дальше' : 'Не знаю'}
      </button>
    </>
  );

  const resultHtml = answers.map(({ word, isGuessed }) => (
    <div key={word}>{`${word} / ${isGuessed}`}</div>
  ));

  return (
    <div className={style.AudioCallPage}>
      {wordsForGame.length === index ? resultHtml : gameHtml}
    </div>
  );
};

AudioCallPage.propTypes = {
  wordsForGame: PropTypes.arrayOf(PropTypes.object).isRequired,
  wordsForRandom: PropTypes.arrayOf(PropTypes.object).isRequired,
  finallySendWordAndProgress: PropTypes.func.isRequired,
};

export default AudioCallPage;
