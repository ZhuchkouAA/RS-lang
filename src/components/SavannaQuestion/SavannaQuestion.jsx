import React from 'react';
import PropTypes from 'prop-types';
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
    </div>
  );
};

SavannaQuestion.propTypes = {
  word: PropTypes.string.isRequired,
  animation: PropTypes.bool.isRequired,
};

export default SavannaQuestion;
