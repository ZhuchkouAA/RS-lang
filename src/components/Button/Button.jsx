import React from 'react';
import PropTypes from 'prop-types';
import ButtonMU from '@material-ui/core/Button';

const Button = ({ handlerClick, text, type, isDisable, color }) => {
  return (
    <ButtonMU
      onClick={handlerClick}
      variant="contained"
      type={type}
      color={color}
      disabled={isDisable}
    >
      {text}
    </ButtonMU>
  );
};

Button.defaultProps = {
  handlerClick: () => {},
  type: 'button',
  isDisable: false,
};

Button.propTypes = {
  handlerClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  isDisable: PropTypes.bool,
  color: PropTypes.string.isRequired,
};

export default Button;
