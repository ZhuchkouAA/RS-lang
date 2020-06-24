import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import { getStyleWidthForText } from '../../helpers/text-utils';
import styles from './WordInput.module.scss';

const WordInput = ({ word, handleInputChange, enteredWord }) => {
  const styleWord = getStyleWidthForText(word);
  const inputRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  }, []);

  return (
    <TextField
      className={styles.WordInput}
      classes={{ root: styles.WordInput__text }}
      autoFocus
      inputRef={inputRef}
      id="outlined-basic"
      variant="outlined"
      size="small"
      value={enteredWord}
      style={styleWord}
      autoComplete="off"
      onChange={handleInputChange}
    />
  );
};

WordInput.propTypes = {
  word: PropTypes.string.isRequired,
  enteredWord: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default WordInput;
