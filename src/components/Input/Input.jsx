import React from 'react';
import PropTypes from 'prop-types';

import { TextField, Typography } from '@material-ui/core';

const MAX_WORDS_PER_DAY = 999999;

const Inputs = ({ label, startValue, settingName, onChange, minValue, maxValue }) => {
  const handlerOnChange = ({ target: { value } }) => {
    const newVal = +value;

    if (newVal < minValue) {
      return null;
    }

    if (maxValue < newVal) {
      return null;
    }

    const newSettingObj = {};
    newSettingObj[settingName] = newVal;

    return onChange(newSettingObj);
  };

  return (
    <>
      <TextField
        variant="outlined"
        autoComplete="off"
        type="number"
        onChange={handlerOnChange}
        size="small"
        value={startValue}
      />
      <Typography variant="body2" gutterBottom>
        {label}
      </Typography>
    </>
  );
};

Inputs.defaultProps = {
  minValue: 1,
  maxValue: MAX_WORDS_PER_DAY,
};

Inputs.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  startValue: PropTypes.string.isRequired,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  settingName: PropTypes.string.isRequired,
};

export default Inputs;
