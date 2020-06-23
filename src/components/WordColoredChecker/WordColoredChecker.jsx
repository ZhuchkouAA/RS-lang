import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import { getColoredEnteredChars } from '../../helpers/text-utils';
import styles from './WordColoredChecker.module.scss';

const WordColoredChecker = ({ isVisible, word, enteredText }) => {
  const letters = getColoredEnteredChars(word, enteredText);
  const style = isVisible ? {} : { opacity: 1 };

  return (
    <Typography
      className={styles.WordColoredChecker}
      style={style}
      variant="body1"
      component="span"
      gutterBottom
    >
      {letters.map((letter, index) => {
        const letterStyle = {
          color: letter.color,
          fontWeight: 700,
        };
        const key = `wordColoredChecker_${letter}__${index}`;

        return (
          <span style={letterStyle} key={key}>
            {letter.value}
          </span>
        );
      })}
    </Typography>
  );
};

WordColoredChecker.propTypes = {
  word: PropTypes.string.isRequired,
  enteredText: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default WordColoredChecker;
