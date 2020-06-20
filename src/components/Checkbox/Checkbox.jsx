import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const Checkbox = ({ label, checkValue, toggle }) => (
  <FormControlLabel
    label={label}
    control={<Switch checked={checkValue} onChange={toggle} id={label} />}
  />
);

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  checkValue: PropTypes.bool.isRequired,
};

export default Checkbox;
