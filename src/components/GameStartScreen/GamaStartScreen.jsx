import React, { useEffect } from 'react';
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

import gamesDiscription from '../../constants/gamesDescription';
import { getQueueMiniGame600ByGroup } from '../../helpers/games-utils/createQueueMiniGame';
import PATHS from '../../constants/path';
import style from './GameStartScreen.module.scss';

const GameStartScreen = ({ gameModeData, repeatWords, setGameMode, setGameWords }) => {
  const { gameName } = gameModeData;
  const { mode } = gameModeData;
  const currentGamePath = gamesDiscription[gameName].path;

  const levels = [
    { value: '0', label: 'Уровень 1' },
    { value: '1', label: 'Уровень 2' },
    { value: '2', label: 'Уровень 3' },
    { value: '3', label: 'Уровень 4' },
    { value: '4', label: 'Уровень 5' },
    { value: '5', label: 'Уровень 6' },
  ];

  if (repeatWords.length > 100) {
    levels.unshift({ value: 'learned words', label: 'Изученные слова' });
  }

  const addWordsGameMode = (gameMode) => {
    if (gameMode === 'learned words') {
      setGameWords(repeatWords);
    } else {
      const words = getQueueMiniGame600ByGroup(+gameMode);
      words.then((response) => {
        setGameWords(response);
      });
    }
  };

  useEffect(() => {
    addWordsGameMode(mode);
    return undefined;
  }, []);

  const handlerChoiseMode = (e) => {
    setGameMode(e.target.value);
    addWordsGameMode(e.target.value);
  };

  return (
    <div className={style.GameStartScreen}>
      <div className={style.GameStartScreen__wrapper}>
        <form>
          <FormControl component="fieldset">
            <FormLabel component="legend">Выберите набор слов:</FormLabel>
            <RadioGroup aria-label="levels" name="levels">
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
              <NavLink className={style.GameStartScreen__button} to={currentGamePath}>
                <Button variant="outlined" color="primary">
                  Начать игру
                </Button>
              </NavLink>
              <NavLink className={style.GameStartScreen__button} to={PATHS.MAIN}>
                <Button variant="outlined" color="secondary">
                  Выход
                </Button>
              </NavLink>
            </Grid>
          </FormControl>
        </form>
        <div className={style.GameStartScreen__about}>
          <span className={style.GameStartScreen__title}>{gameName}</span>
          <span className={style.GameStartScreen__description}>
            {gamesDiscription[gameName].discription}
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
};

export default GameStartScreen;
