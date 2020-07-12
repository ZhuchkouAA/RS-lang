import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import ColoredChar from '../ColoredChar';
import { getColoredEnteredChars } from '../../helpers/text-utils';
import styles from './WordColoredChecker.module.scss';

const WordColoredChecker = ({ isVisible, word, wordToCheck }) => {
  const letters = getColoredEnteredChars(word, wordToCheck);

  const checkerClasses = classNames(styles.WordColoredChecker, {
    [styles.WordColoredChecker__show]: isVisible && word !== wordToCheck,
    [styles.WordColoredChecker__fix]: word.toLowerCase() === wordToCheck.toLowerCase(),
  });

  return (
    <Typography className={checkerClasses} variant="body1" component="span" gutterBottom>
      {letters.map(({ value, colorType }, index) => {
        const key = `wordColoredChecker_${value}__${index}`;

        return <ColoredChar colorType={colorType} value={value} key={key} />;
      })}
    </Typography>
  );
};

WordColoredChecker.propTypes = {
  word: PropTypes.string.isRequired,
  wordToCheck: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default WordColoredChecker;
