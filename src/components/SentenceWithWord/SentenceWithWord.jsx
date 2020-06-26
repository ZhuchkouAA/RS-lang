import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import {
  splitSentenceByWord,
  getStyleWidthForText,
  getTemplateForWord,
} from '../../helpers/text-utils';

import styles from './SentenceWithWord.module.scss';

const SentenceWithWord = ({ sentence, word, isWordVisible, isHide }) => {
  const { sentencePart, wordIndex } = splitSentenceByWord(sentence);
  const wordWidth = getStyleWidthForText(sentencePart[wordIndex]);
  const template = isWordVisible ? word : getTemplateForWord(word);
  const keyPre = 'sentenceWithWord';

  const classes = classNames(styles.SentenceWithWord, {
    [styles['SentenceWithWord--hide']]: !isHide,
  });

  return (
    <Typography className={classes} variant="body1" color="textPrimary" component="p" gutterBottom>
      {sentencePart.map((text, index) => {
        if (index === wordIndex) {
          return (
            <span className={styles.SentenceWithWord__selected} key={word} style={wordWidth}>
              {template}
            </span>
          );
        }
        return <span key={`${keyPre}_${text}`}>{text}</span>;
      })}
    </Typography>
  );
};

SentenceWithWord.propTypes = {
  sentence: PropTypes.string.isRequired,
  word: PropTypes.string.isRequired,
  isWordVisible: PropTypes.bool.isRequired,
  isHide: PropTypes.bool.isRequired,
};

export default SentenceWithWord;
