import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Grid,
} from '@material-ui/core/';

import gamesDescription from '../../constants/gamesDescription';
import { getQueueMiniGame600ByGroup } from '../../helpers/games-utils/createQueueMiniGame';
import { getQueueRandom300 } from '../../helpers/getProgress-utils';
import { onlyStudying } from '../../helpers/games-utils/filtersAndSorters';
import serverSynchronization from '../../middlewares/serverSynchronization';
import PATHS from '../../constants/path';
import style from './GameStartScreen.module.scss';

const GameStartScreen = ({
  gameModeData,
  repeatWords,
  setGameMode,
  setGameWords,
  setRandomWords,
  runLoader,
  stopLoader,
  isLoading,
}) => {
  const { gameName } = gameModeData;
  const { mode } = gameModeData;
  const currentGamePath = gamesDescription[gameName].path;
  console.log(currentGamePath);
  const [isActiveButton, setIsActiveButton] = useState(true);
  const rightNameOfGame = [];

  const levels = [
    { value: '0', label: 'Уровень 1' },
    { value: '1', label: 'Уровень 2' },
    { value: '2', label: 'Уровень 3' },
    { value: '3', label: 'Уровень 4' },
    { value: '4', label: 'Уровень 5' },
    { value: '5', label: 'Уровень 6' },
  ];

  const wordsLearnedMinimumLength = 50;
  const learnedWords = onlyStudying(repeatWords);
  if (learnedWords.length > wordsLearnedMinimumLength) {
    levels.unshift({ value: 'learned words', label: 'Изученные слова' });
  }

  const addWordsGameMode = (gameMode) => {
    if (gameMode === 'learned words') {
      return setGameWords(repeatWords);
    }
    setIsActiveButton(true);
    const words = getQueueMiniGame600ByGroup(+gameMode);

    return words.then((response) => {
      setGameWords(response);
      setIsActiveButton(false);
    });
  };

  useEffect(() => {
    const updateData = async () => {
      runLoader();
      await serverSynchronization();
      await addWordsGameMode(mode);
      const randomWords = await getQueueRandom300();
      await setRandomWords(randomWords);
      setIsActiveButton(false);
      stopLoader();
    };
    updateData();
    return undefined;
  }, []);

  const handlerChoiseMode = ({ target: { value } }) => {
    setGameMode(value);
    addWordsGameMode(value);
  };

  if (isLoading) {
    return <div />;
  }

  if (gameName === 'Аудио_Вызов') {
    rightNameOfGame.push('Аудио Вызов');
  } else if (gameName === 'Скажи_это') {
    rightNameOfGame.push('Скажи это!');
  } else {
    rightNameOfGame.push(gameName);
  }

  return (
    <div className={style.GameStartScreen}>
      <div className={style.GameStartScreen__wrapper}>
        <form>
          <FormControl component="fieldset">
            <FormLabel component="legend">Выберите набор слов:</FormLabel>
            <RadioGroup aria-label="levels" name="levels" style={{ alignItems: 'flex-start' }}>
              {levels.map(({ label, value }) => {
                return (
                  <FormControlLabel
                    value={value}
                    control={
                      <Radio checked={value === mode} onClick={handlerChoiseMode} color="primary" />
                    }
                    label={label}
                    labelPlacement="start"
                    key={label}
                  />
                );
              })}
            </RadioGroup>
            <Grid container direction="row" justify="space-around" alignItems="center">
              <NavLink
                className={style['GameStartScreen-button']}
                disabled={isActiveButton}
                to={!isActiveButton && currentGamePath}
              >
                <Button disabled={isActiveButton} variant="outlined" color="primary">
                  Начать игру
                </Button>
              </NavLink>
              <NavLink className={style['GameStartScreen-button']} to={PATHS.MAIN}>
                <Button variant="outlined" color="secondary">
                  Выход
                </Button>
              </NavLink>
            </Grid>
          </FormControl>
        </form>
        <div className={style.GameStartScreen__about}>
          <span className={style.GameStartScreen__title}>{rightNameOfGame}</span>
          <span className={style.GameStartScreen__description}>
            {gamesDescription[gameName].description}
          </span>
        </div>
      </div>
    </div>
  );
};

GameStartScreen.propTypes = {
  gameModeData: PropTypes.shape({
    gameName: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    words: PropTypes.array.isRequired,
  }).isRequired,
  repeatWords: PropTypes.arrayOf(PropTypes.object).isRequired,
  setGameMode: PropTypes.func.isRequired,
  setGameWords: PropTypes.func.isRequired,
  setRandomWords: PropTypes.func.isRequired,
  runLoader: PropTypes.func.isRequired,
  stopLoader: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default GameStartScreen;
