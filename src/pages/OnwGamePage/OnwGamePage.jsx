import React, { useEffect, useRef, useState } from 'react';
import { Card, Grid, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import CustomButton from '../../components/Button';
import URLS from '../../constants/APIUrls';
import actionText from '../../constants/ownGame';
import randomNumberCreator from '../../helpers/games-utils/returnRandomNumber';
import SymbolWindow from '../../components/SymbolWindow';
import styles from './OnwGamePage.module.scss';

const OnwGamePage = ({ words }) => {
  const wordDataCreator = (wordId) => {
    const data = new Array(words[wordId].optional.word.length);
    data.fill(false);
    return data;
  };
  const initialData = wordDataCreator(0);

  const [currentWord, setCurrentWord] = useState({ id: 0, data: initialData });
  const [currentSymbol, setCurrentSymbol] = useState('');
  const [wordAnswer, setWordAnswer] = useState('');
  const [rouletteData, setRouletteData] = useState(0);
  const [isUserChoiseActive, setIsUserChoiseActive] = useState(false);
  const [prevWord, setPrevWord] = useState('');
  const symbolRef = useRef(null);
  const playBtnRef = useRef(null);
  const word = words[currentWord.id].optional.word.split('');
  const audioUrl = `${URLS.ASSETS}${words[currentWord.id].optional.audio}`;
  const audio = new Audio(audioUrl);

  audio.onended = () => {
    setRouletteData(5);
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
    if (rouletteData === 2 && isUserChoiseActive) {
      setRouletteData(5);
      const openSymbolId = +e.target.id;
      searchForMatchingSymbols(word, word[openSymbolId]);
      setIsUserChoiseActive(false);
    }
  };

  useEffect(() => {
    if (rouletteData === 3) {
      audio.play();
    }
  }, [rouletteData]);

  useEffect(() => {
    const isAllTrue = currentWord.data.every((elem) => elem === true);
    const isSomeTrue = currentWord.data.some((elem) => elem === true);
    if (isSomeTrue && isAllTrue) {
      setPrevWord(words[currentWord.id].optional.word);
      const newWordData = wordDataCreator(currentWord.id + 1);
      setCurrentWord({ id: currentWord.id + 1, data: newWordData });
      setIsUserChoiseActive(false);
      setRouletteData(6);
      playBtnRef.current.focus();
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
    setRouletteData(5);
    setIsUserChoiseActive(false);
  };

  const handlerSubmitWord = (e) => {
    e.preventDefault();
    if (wordAnswer === words[currentWord.id].optional.word) {
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
    const randomNumber = Math.round(randomNumberCreator(1, 3));
    if (randomNumber === 1) {
      symbolRef.current.focus();
    }
    setRouletteData(randomNumber);
  };

  const wordsSymbols = word.map((symbol, id) => {
    return <SymbolWindow handlerClick={openSymbol} id={id} text={currentWord.data[id] && symbol} />;
  });

  const actionTextBlock = () => {
    let text;
    if (rouletteData === 6) {
      text = prevWord;
    } else {
      text = actionText[rouletteData];
    }

    return <Box className={styles['Card__action-text']}>{text}</Box>;
  };

  return (
    <div className={styles.wrapper}>
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
              Играть
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
            <form onSubmit={handlerSubmitSymbol} className={styles.Card__symbol}>
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
                isDisable={!(rouletteData === 1 && isUserChoiseActive)}
                color="primary"
                type="submit"
                text="Буква"
              />
            </form>
          </Grid>
        </Card>
      </Grid>
    </div>
  );
};

OnwGamePage.propTypes = {
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OnwGamePage;
