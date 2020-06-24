import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import { MANY_ERRORS, FEW_ERRORS } from '../../constants/app-settings';
import { getColoredEnteredChars } from '../../helpers/text-utils';
import styles from './WordColoredChecker.module.scss';

const WordColoredChecker = ({ opacity, word, wordToCheck }) => {
  const letters = getColoredEnteredChars(word, wordToCheck);
  const style = { opacity };

  return (
    <Typography
      className={styles.WordColoredChecker}
      style={style}
      variant="body1"
      component="span"
      gutterBottom
    >
      {letters.map(({ value, colorType }, index) => {
        let letterColor = styles['WordColoredChecker__no-errors'];
        switch (colorType) {
          case MANY_ERRORS:
            letterColor = styles['WordColoredChecker__many-errors'];
            break;
          case FEW_ERRORS:
            letterColor = styles['WordColoredChecker__few-errors'];
            break;
          default:
            break;
        }
        const letterClasses = classNames(styles.WordColoredChecker__letter, letterColor);
        const key = `wordColoredChecker_${value}__${index}`;

        return (
          <span className={letterClasses} key={key}>
            {value}
          </span>
        );
      })}
    </Typography>
  );
};

WordColoredChecker.propTypes = {
  word: PropTypes.string.isRequired,
  wordToCheck: PropTypes.string.isRequired,
  opacity: PropTypes.number.isRequired,
};

export default WordColoredChecker;
