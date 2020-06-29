import React from 'react';
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

import style from './GameStartScreen.module.scss';

const GameStartScreen = ({
  gameName = 'Суперигра',
  gameDescription = 'Суперописание правил или что-то еще',
}) => {
  const [level, setLevel] = React.useState('0');

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = ({ target: { value } }) => setLevel(value);

  const levels = [
    { value: '0', label: 'Изученные слова' },
    { value: '1', label: 'Уровень 1' },
    { value: '2', label: 'Уровень 2' },
    { value: '3', label: 'Уровень 3' },
    { value: '4', label: 'Уровень 4' },
    { value: '5', label: 'Уровень 5' },
    { value: '6', label: 'Уровень 6' },
  ];

  return (
    <div className={style.GameStartScreen}>
      <div className={style.GameStartScreen__wrapper}>
        <form onSubmit={handleSubmit}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Выберите набор слов:</FormLabel>
            <RadioGroup aria-label="levels" value={level} name="levels" onChange={handleChange}>
              {levels.map(({ label, value }) => {
                return (
                  <FormControlLabel
                    value={value}
                    control={<Radio color="primary" />}
                    label={label}
                    labelPlacement="start"
                    key={label}
                  />
                );
              })}
            </RadioGroup>
            <Grid container direction="row" justify="space-around" alignItems="center">
              <Button type="submit" variant="outlined" color="primary">
                Начать игру
              </Button>
              <Button variant="outlined" color="secondary">
                Выход
              </Button>
            </Grid>
          </FormControl>
        </form>
        <div className={style.GameStartScreen__about}>
          <span className={style.GameStartScreen__title}>{gameName}</span>
          <span className={style.GameStartScreen__description}>{gameDescription}</span>
        </div>
      </div>
    </div>
  );
};

GameStartScreen.propTypes = {
  gameName: PropTypes.string.isRequired,
  gameDescription: PropTypes.string.isRequired,
};

export default GameStartScreen;
