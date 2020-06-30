import React from 'react';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import classNames from 'classnames';
import styles from './SavannaQuestion.module.scss';

const SavannaQuestion = ({ word, animation }) => {
  return (
    <div id="savanna_question" className={styles.question}>
      <span
        className={classNames(
          styles.question__wrapper,
          animation ? styles.question__wrapper_animated : styles.question__wrapper_animated1
        )}
      >
        {word}
      </span>
=======
import styles from './SavannaQuestion.module.scss';

const SavannaQuestion = ({ word }) => {
  return (
    <div className={styles.question}>
      <span className={styles.question__wrapper}>{word}</span>
>>>>>>> RLS-34: add Savanna components
    </div>
  );
};

SavannaQuestion.propTypes = {
  word: PropTypes.string.isRequired,
<<<<<<< HEAD
  animation: PropTypes.bool.isRequired,
=======
>>>>>>> RLS-34: add Savanna components
};

export default SavannaQuestion;
