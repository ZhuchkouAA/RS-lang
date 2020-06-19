import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import {
  splitSentenceByWord,
  getStyleWidthForText,
  getTemplateForWord,
} from '../../helpers/text-utils';

import styles from './SentenceWithWord.module.scss';

const SentenceWithWord = ({ sentence, word }) => {
  const { sentencePart, wordIndex } = splitSentenceByWord(sentence);
  const styleWord = getStyleWidthForText(sentencePart[wordIndex]);
  const template = getTemplateForWord(word);
  const keyPre = 'sentenceWithWord';

  return (
    <Typography
      className={styles.SentenceWithWord}
      variant="body1"
      color="textPrimary"
      component="p"
      gutterBottom
    >
      {sentencePart.map((text, index) => {
        if (index === wordIndex) {
          return (
            <span className={styles.SentenceWithWord__selected} key={word} style={styleWord}>
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
};

export default SentenceWithWord;
