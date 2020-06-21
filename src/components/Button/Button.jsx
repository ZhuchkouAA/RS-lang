import React from 'react';
import PropTypes from 'prop-types';
import ButtonMU from '@material-ui/core/Button';

const Button = ({ handlerClick, text, type, isDisable }) => {
  return (
    <ButtonMU
      onClick={handlerClick}
      variant="contained"
      type={type}
      color="primary"
      disabled={isDisable}
    >
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
  isDisable: PropTypes.bool.isRequired,
};

export default Button;
