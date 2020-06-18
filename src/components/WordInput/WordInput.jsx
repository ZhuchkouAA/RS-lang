import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import { getStyleWidthForText } from '../../helpers/text-utils';

const WordInput = ({ word }) => {
  const styleWord = getStyleWidthForText(word);

  const inputRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  }, []);

  return (
    <TextField
      autoFocus
      inputRef={inputRef}
      id="outlined-basic"
      variant="outlined"
      size="small"
      defaultValue=""
      style={styleWord}
    />
  );
};

WordInput.propTypes = {
  word: PropTypes.string.isRequired,
};

export default WordInput;
