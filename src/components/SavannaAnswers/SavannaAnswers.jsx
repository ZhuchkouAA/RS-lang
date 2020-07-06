import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Button from '../Button';

import styles from './SavannaAnswers.module.scss';

const SavannaAnswers = ({ answers, handlerClick }) => {
  return (
    <div className={styles.answer__wrapper}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        {answers.map((answer, index) => {
          return (
            <Button
              text={`${index + 1}. ${answer}`}
              color="primary"
              handlerClick={() => handlerClick(answer)}
              key={`Digit${index + 1}`}
            />
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
