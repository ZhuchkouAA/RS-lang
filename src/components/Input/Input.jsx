import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ label, value, inputChange }) => (
  <div className="checkbox">
    <label htmlFor={label}>
      {label}
      <input type="number" value={value} onChange={inputChange} id={label} />
    </label>
  </div>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  inputChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default Input;
