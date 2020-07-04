/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Button from '../Button';

import styles from './SavannaAnswers.module.scss';

const SavannaAnswers = ({ answers, handlerClick }) => {
  return (
    <div className={styles.answer__wrapper}>
      <Grid container direction="row" justify="space-evenly" alignItems="center">
        {answers.map((answer) => {
          return (
            <Button
              text={answer}
              color="primary"
              handlerClick={() => handlerClick(answer)}
              key={answer}
            />
          );
        })}
      </Grid>
    </div>
  );
};

SavannaAnswers.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string),
  handlerClick: PropTypes.func.isRequired,
};

export default SavannaAnswers;
