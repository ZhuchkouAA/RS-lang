import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import { getStyleWidthForText } from '../../helpers/text-utils';
import styles from './WordInput.module.scss';

const WordInput = ({ word, handleInputChange, enteredWord, isInputDisable }) => {
  const styleWord = getStyleWidthForText(word);

  return (
    <TextField
      className={styles.WordInput}
      classes={{ root: styles.WordInput__text }}
      autoFocus
      id="outlined-basic"
      variant="outlined"
      size="small"
      value={enteredWord}
      style={styleWord}
      autoComplete="off"
      onChange={handleInputChange}
      disabled={isInputDisable}
      inputProps={{
        style: {
          color: '#456d52',
          fontWeight: 700,
        },
      }}
    />
  );
};

WordInput.propTypes = {
  word: PropTypes.string.isRequired,
  enteredWord: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  isInputDisable: PropTypes.bool.isRequired,
};

export default WordInput;
