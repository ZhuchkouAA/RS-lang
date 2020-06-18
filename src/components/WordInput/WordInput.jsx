import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const getTextWidthInPx = (text) => {
  const span = document.createElement('span');

  span.style.fontSize = `${16}px`;
  span.style.height = 'auto';
  span.style.width = 'auto';
  span.style.position = 'absolute';
  span.style.whiteSpace = 'no-wrap';
  span.style.top = '-200px';
  span.innerHTML = text;

  document.body.appendChild(span);

  const res = Math.ceil(span.clientWidth) + 10;

  span.remove();

  return res;
};

const WordInput = ({ word }) => {
  const wordWidth = getTextWidthInPx(word);
  const doublePadding = 28;
  const inputWidth = { width: `${wordWidth + doublePadding}px` };

  return (
    <TextField
      id="outlined-basic"
      variant="outlined"
      size="small"
      defaultValue={word}
      style={inputWidth}
    />
  );
};

WordInput.propTypes = {
  word: PropTypes.string.isRequired,
};

export default WordInput;
