import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import ButtonMU from '@material-ui/core/Button';

import styles from './SavannaAnswers.module.scss';

const SavannaAnswers = ({ answers, handlerClick }) => {
  return (
    <div className={styles.answer__wrapper}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        {answers.map((answer, index) => {
          return (
            <ButtonMU
              onClick={() => handlerClick(answer)}
              variant="outlined"
              color="primary"
              key={`Digit${index + 1}`}
            >
              {`${index + 1}. ${answer}`}
            </ButtonMU>
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
