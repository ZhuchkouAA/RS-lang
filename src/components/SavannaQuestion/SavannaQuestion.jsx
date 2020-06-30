import React from 'react';
import PropTypes from 'prop-types';
import styles from './SavannaQuestion.module.scss';

const SavannaQuestion = ({ word }) => {
  return (
    <div className={styles.question}>
      <span className={styles.question__wrapper}>{word}</span>
    </div>
  );
};

SavannaQuestion.propTypes = {
  word: PropTypes.string.isRequired,
};

export default SavannaQuestion;
