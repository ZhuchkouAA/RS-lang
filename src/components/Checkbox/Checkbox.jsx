import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ label, checkValue, toggleCheckboxChange }) => (
  <div className="checkbox">
    <label htmlFor={label}>
      {label}
      <input type="checkbox" checked={checkValue} onChange={toggleCheckboxChange} id={label} />
    </label>
  </div>
);

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  toggleCheckboxChange: PropTypes.func.isRequired,
  checkValue: PropTypes.bool.isRequired,
};

export default Checkbox;
