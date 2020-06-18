import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ handlerClick, text }) => {
  return (
    <button onClick={handlerClick} type="button">
      {text}
    </button>
  );
};

Button.propTypes = {
  handlerClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;
