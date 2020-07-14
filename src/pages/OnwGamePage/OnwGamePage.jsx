import React, { useEffect, useRef, useState } from 'react';
import { Card, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import classNames from 'classnames';
import CustomButton from '../../components/Button';
import SymbolWindow from '../../components/SymbolWindow';
import GamesStatisticsDialog from '../../components/GamesStatisticsDialog';
import randomNumberCreator from '../../helpers/games-utils/returnRandomNumber';
import wordHandler from '../../helpers/games-utils/wordHandler';
import URLS from '../../constants/APIUrls';
import actionText from '../../constants/ownGame';
import WORD_HANDLER_KEYS from '../../constants/keys';
import {
  DIFFICULTY_GAME_PENALTY,
  DIFFICULTY_GAME_REWARD,
} from '../../constants/variables-learning';
import styles from './OnwGamePage.module.scss';

const sendingStatistics = (isPenalty, word, callback, mode) => {
  if (mode !== 'learned words') return;

  let preparedWord;
  if (isPenalty) {
    preparedWord = wordHandler(word, [
      { key: WORD_HANDLER_KEYS.difficulty, value: DIFFICULTY_GAME_PENALTY },
    ]);
  } else {
    preparedWord = wordHandler(word, [
      { key: WORD_HANDLER_KEYS.difficulty, value: DIFFICULTY_GAME_REWARD },
      { key: WORD_HANDLER_KEYS.isHighPriority, value: true },
    ]);
  }
  callback(preparedWord);
};

const OnwGamePage = ({ words, mode, finallySendWordAndProgress }) => {
  const wordDataCreator = (wordId) => {
    const data = new Array(words[wordId].optional.word.length);
    data.fill(false);
    return data;
  };
  const initialData = wordDataCreator(0);

  const maxNumberOfWordsInGame = 20;
  const startGameId = 0;
  const guessSymbolModeId = 1;
  const openAnySymbolModeId = 2;
  const playSoundModeId = 3;
  const emptyTextModeId = 5;
  const showPrevWordTextModeId = 6;

  const [currentWord, setCurrentWord] = useState({ id: 0, data: initialData });
  const [currentSymbol, setCurrentSymbol] = useState('');
  const [wordAnswer, setWordAnswer] = useState('');
  const [rouletteData, setRouletteData] = useState(startGameId);
  const [isUserChoiseActive, setIsUserChoiseActive] = useState(false);
  const [prevWord, setPrevWord] = useState('');
  const [wordsResult, setWordsResult] = useState([]);
  const [tryCounter, setTryCounter] = useState(0);

  const symbolRef = useRef(null);
  const playBtnRef = useRef(null);

  const word = words[currentWord.id].optional.word.split('');
  const audioUrl = `${URLS.ASSETS}${words[currentWord.id].optional.audio}`;
  const audio = new Audio(audioUrl);

  const wordResultHandler = (isRight) => {
    const wordResult = { ...words[currentWord.id] };
    wordResult.isRight = isRight;
    const newWordsResult = wordsResult;
    newWordsResult.push(wordResult);
    setWordsResult(newWordsResult);
  };

  audio.onended = () => {
    setRouletteData(emptyTextModeId);
    setIsUserChoiseActive(false);
  };

  useEffect(() => {
    if (!isUserChoiseActive) {
      playBtnRef.current.focus();
    }
  }, [isUserChoiseActive]);

  const searchForMatchingSymbols = (wordArray, symbol) => {
    wordArray.forEach((letter, id) => {
      if (letter === symbol) {
        const newCurrentWord = { ...currentWord };
        newCurrentWord.data[id] = true;
        setCurrentWord(newCurrentWord);
      }
    });
  };

  const openSymbol = (e) => {
    if (rouletteData === openAnySymbolModeId && isUserChoiseActive) {
      setTryCounter(tryCounter + 1);
      setRouletteData(emptyTextModeId);
      const openSymbolId = +e.target.id;
      searchForMatchingSymbols(word, word[openSymbolId]);
      setIsUserChoiseActive(false);
    }
  };

  useEffect(() => {
    if (rouletteData === playSoundModeId) {
      setTryCounter(tryCounter + 1);
      audio.play();
    }
  }, [rouletteData]);

  useEffect(() => {
    const isAllTrue = currentWord.data.every((elem) => elem === true);
    const isSomeTrue = currentWord.data.some((elem) => elem === true);
    if (isSomeTrue && isAllTrue) {
      const isPerfectAnswer = tryCounter === 0;
      sendingStatistics(!isPerfectAnswer, words[currentWord.id], finallySendWordAndProgress, mode);
      wordResultHandler(false);
      setPrevWord(words[currentWord.id].optional.word);
      const newWordData = wordDataCreator(currentWord.id + 1);
      setCurrentWord({ id: currentWord.id + 1, data: newWordData });
      setIsUserChoiseActive(false);
      setRouletteData(showPrevWordTextModeId);
      playBtnRef.current.focus();
      setTryCounter(0);
    }
    return undefined;
  }, [currentWord]);

  const handlerInputChange = ({ target }) => {
    setCurrentSymbol(target.value);
  };

  const handlerSubmitSymbol = (e) => {
    e.preventDefault();
    searchForMatchingSymbols(word, currentSymbol);
    setCurrentSymbol('');
    setRouletteData(emptyTextModeId);
    setIsUserChoiseActive(false);
    setTryCounter(tryCounter + 1);
  };

  const handlerSubmitWord = (e) => {
    e.preventDefault();
    if (wordAnswer === words[currentWord.id].optional.word) {
      const isPerfectAnswer = tryCounter === 0;
      wordResultHandler(isPerfectAnswer);
      sendingStatistics(!isPerfectAnswer, words[currentWord.id], finallySendWordAndProgress, mode);
      const newWordData = wordDataCreator(currentWord.id + 1);
      setCurrentWord({ id: currentWord.id + 1, data: newWordData });
    }
    setWordAnswer('');
  };

  const handlerAnswerWord = (e) => {
    setWordAnswer(e.target.value.toLowerCase());
  };

  const handlerRouletteClick = () => {
    setCurrentSymbol('');
    setIsUserChoiseActive(true);
    const randomNumber = Math.round(randomNumberCreator(guessSymbolModeId, playSoundModeId));
    if (randomNumber === guessSymbolModeId) {
      symbolRef.current.focus();
    }
    setRouletteData(randomNumber);
  };

  const wordsSymbols = word.map((symbol, id) => {
    const key = `OwnGame__${symbol}-${id}`;
    return (
      <SymbolWindow
        handlerClick={openSymbol}
        id={id}
        key={key}
        text={(currentWord.data[id] && symbol) || ''}
      />
    );
  });

  const actionTextBlock = () => {
    let text;
    if (rouletteData === showPrevWordTextModeId) {
      text = prevWord;
    } else {
      text = actionText[rouletteData];
    }

    return <Box className={styles['Card__action-text']}>{text}</Box>;
  };

  const fortune = () => (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        <Card className={styles.Card}>
          <Typography className={styles['Card__message-group']} gutterBottom variant="h6">
            {actionTextBlock()}
            <Button
              variant="contained"
              color="primary"
              disabled={isUserChoiseActive}
              onClick={handlerRouletteClick}
              ref={playBtnRef}
            >
              Подсказка
            </Button>
          </Typography>
          <Typography className={styles.Card__word} gutterBottom variant="h5">
            <Box>{words[currentWord.id].optional.wordTranslate}</Box>
          </Typography>
          <Box className={styles['Card__hidden-word']}>{wordsSymbols}</Box>
          <Grid className={styles.Card__forms}>
            <form onSubmit={handlerSubmitWord} className={styles['Card__word-input']}>
              <Box className={styles.Card__input}>
                <TextField
                  className={styles['Card__word-textarea']}
                  value={wordAnswer}
                  onChange={handlerAnswerWord}
                />
              </Box>
              <CustomButton
                className={styles.Card__button}
                color="secondary"
                type="submit"
                text="Слово"
              />
            </form>
            <form
              onSubmit={handlerSubmitSymbol}
              className={classNames(
                styles.Card__symbol,
                rouletteData !== guessSymbolModeId && styles.Card__hide
              )}
            >
              <Box className={styles.Card__input}>
                <TextField
                  inputRef={symbolRef}
                  value={currentSymbol}
                  onChange={handlerInputChange}
                  inputProps={{
                    maxLength: 1,
                  }}
                />
              </Box>
              <CustomButton
                isDisable={!(rouletteData === guessSymbolModeId && isUserChoiseActive)}
                color="primary"
                type="submit"
                text="Буква"
              />
            </form>
          </Grid>
        </Card>
      </Grid>
    </>
  );

  return (
    <div className={styles.wrapper}>
      {(currentWord.id > maxNumberOfWordsInGame && (
        <GamesStatisticsDialog isOpen words={wordsResult} />
      )) ||
        fortune()}
    </div>
  );
};

OnwGamePage.propTypes = {
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
  mode: PropTypes.string.isRequired,
  finallySendWordAndProgress: PropTypes.func.isRequired,
};

export default OnwGamePage;
