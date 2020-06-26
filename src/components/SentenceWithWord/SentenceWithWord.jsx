import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';
import classNames from 'classnames';

import {
  splitSentenceByWord,
  getStyleWidthForText,
  getTemplateForWord,
} from '../../helpers/text-utils';

import IconMini from '../IconMini';

import styles from './SentenceWithWord.module.scss';

const SentenceWithWord = ({
  sentence,
  word,
  translateText,
  playText,
  isWordVisible,
  isSentenceShow,
  isTranslateShow,
  isAudioBtnShow,
}) => {
  const { sentencePart, wordIndex } = splitSentenceByWord(sentence);
  const wordWidth = getStyleWidthForText(sentencePart[wordIndex]);
  const template = isWordVisible ? word : getTemplateForWord(word);
  const keyPre = 'sentenceWithWord';

  const sentenceClasses = classNames(styles.SentenceWithWord__text, {
    [styles['Block--hide']]: !isSentenceShow,
  });
  const translateTextClasses = classNames(styles.WordCard__text, {
    [styles['Block--hide']]: !isTranslateShow,
  });

  return (
    <Grid container justify="center">
      <Grid container direction="row" justify="center" alignItems="center">
        <Typography
          className={sentenceClasses}
          variant="body1"
          color="textPrimary"
          component="p"
          gutterBottom
        >
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
        {isAudioBtnShow && <IconMini handlerClick={playText} />}
      </Grid>
      <Typography
        className={translateTextClasses}
        variant="body1"
        color="textSecondary"
        component="p"
        gutterBottom
      >
        {translateText}
      </Typography>
    </Grid>
  );
};

SentenceWithWord.propTypes = {
  playText: PropTypes.func.isRequired,
  sentence: PropTypes.string.isRequired,
  word: PropTypes.string.isRequired,
  translateText: PropTypes.string.isRequired,
  isWordVisible: PropTypes.bool.isRequired,
  isSentenceShow: PropTypes.bool.isRequired,
  isTranslateShow: PropTypes.bool.isRequired,
  isAudioBtnShow: PropTypes.bool.isRequired,
};

export default SentenceWithWord;
