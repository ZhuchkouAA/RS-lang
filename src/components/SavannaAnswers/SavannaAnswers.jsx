import React from 'react';
import PropTypes from 'prop-types';
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
<<<<<<< HEAD
            <Grid item key={`Digit${index + 1}`}>
              <ButtonMU onClick={() => handlerClick(answer)} variant="outlined" color="primary">
                {`${index + 1}. ${answer}`}
              </ButtonMU>
            </Grid>
=======
            <ButtonMU
              onClick={() => handlerClick(answer)}
              variant="outlined"
              color="primary"
              key={`Digit${index + 1}`}
            >
              {`${index + 1}. ${answer}`}
            </ButtonMU>
>>>>>>> RSL-34: fix animation, add lives icons
          );
        })}
      </Grid>
    </div>
  );
};

SavannaAnswers.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  handlerClick: PropTypes.func.isRequired,
};

export default SavannaAnswers;
