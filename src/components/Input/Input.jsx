import React from 'react';
import PropTypes from 'prop-types';

import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Inputs = ({ label, value, onChange }) => (
  <FormControlLabel
    label={label}
    control={<Input type="number" value={value} onChange={onChange} id={label} />}
  />
);

Inputs.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default Inputs;
