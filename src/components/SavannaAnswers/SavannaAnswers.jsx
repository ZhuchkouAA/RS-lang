import React from 'react';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import { Grid } from '@material-ui/core';
import ButtonMU from '@material-ui/core/Button';

import styles from './SavannaAnswers.module.scss';

const SavannaAnswers = ({ answers, handlerClick }) => {
  const answerArr = answers.sort(() => Math.random() - 0.5);
  return (
    <div className={styles.answer__wrapper}>
      <Grid container spacing={1} direction="row" justify="space-between" alignItems="flex-start">
        {answerArr.map((answer, index) => {
          return (
            <Grid item key={`Digit${index + 1}`}>
              <ButtonMU onClick={() => handlerClick(answer)} variant="outlined" color="primary">
                {`${index + 1}. ${answer}`}
              </ButtonMU>
            </Grid>
          );
        })}
      </Grid>
=======
import Button from '../Button';

import styles from './SavannaAnswers.module.scss';

const SavannaAnswers = ({ answers }) => {
  return (
    <div className={styles.answer__wrapper}>
      {answers.map((answer) => {
        return <Button text={answer} color="primary" />;
      })}
>>>>>>> RLS-34: add Savanna components
    </div>
  );
};

SavannaAnswers.propTypes = {
<<<<<<< HEAD
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  handlerClick: PropTypes.func.isRequired,
=======
  answers: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.string])).isRequired,
>>>>>>> RLS-34: add Savanna components
};

export default SavannaAnswers;
