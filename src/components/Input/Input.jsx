import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ label, value, onChange }) => (
  <div className="checkbox">
    <label htmlFor={label}>
      {label}
      <input type="number" value={value} onChange={onChange} id={label} />
    </label>
  </div>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default Input;
