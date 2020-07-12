import React from 'react';

import PropTypes from 'prop-types';

import { TextField, Typography } from '@material-ui/core';

const Inputs = ({ label, startValue, settingName, onChange, inputProps }) => {
  const handlerOnChange = ({ target }) => {
    const settingObj = {
      [settingName]: +target.value,
    };

    return onChange(settingObj);
  };

  return (
    <>
      <TextField
        variant="outlined"
        autoComplete="off"
        onChange={handlerOnChange}
        type="number"
        size="small"
        value={startValue}
        inputProps={inputProps}
      />
      <Typography variant="body2" gutterBottom>
        {label}
      </Typography>
    </>
  );
};

Inputs.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  startValue: PropTypes.string.isRequired,
  inputProps: PropTypes.objectOf(PropTypes.any).isRequired,
  settingName: PropTypes.string.isRequired,
};

export default Inputs;
