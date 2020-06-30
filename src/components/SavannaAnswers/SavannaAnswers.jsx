import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

import styles from './SavannaAnswers.module.scss';

const SavannaAnswers = ({ answers }) => {
  return (
    <div className={styles.answer__wrapper}>
      {answers.map((answer) => {
        return <Button text={answer} color="primary" />;
      })}
    </div>
  );
};

SavannaAnswers.propTypes = {
  answers: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.string])).isRequired,
};

export default SavannaAnswers;
