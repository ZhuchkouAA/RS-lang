import React from 'react';
import PropTypes from 'prop-types';
import ButtonMU from '@material-ui/core/Button';

const Button = ({ handlerClick, text, type }) => {
  return (
    <ButtonMU onClick={handlerClick} type={type}>
      {text}
    </ButtonMU>
  );
};

Button.defaultProps = {
  handlerClick: () => {},
  type: 'button',
};

Button.propTypes = {
  handlerClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default Button;
