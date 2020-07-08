import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FormControlLabel, Switch } from '@material-ui/core';

import { MAIN_HINTS, MINIMUN_COUNT_HINTS } from '../../constants/app-settings';
import { MINIMUM_LIMIT_HINTS } from '../../constants/modal-messages';

import Dialog from '../Dialog';

const Toggle = ({ label, checkValue, settingName, toggle, countHints }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const isMainHint = MAIN_HINTS.includes(settingName);

  const handlerOnChange = () => {
    const isTurnOffLastMainHint = checkValue && countHints === MINIMUN_COUNT_HINTS;

    if (isMainHint && isTurnOffLastMainHint) {
      setModalOpen(true);

      return null;
    }

    const step = checkValue ? -1 : 1;
    const newSettingObj = {};
    newSettingObj[settingName] = !checkValue;

    return toggle(newSettingObj, isMainHint, step);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (isModalOpen) {
    return (
      <Dialog
        isOpen
        type="error"
        tittle={MINIMUM_LIMIT_HINTS.tittle}
        message={MINIMUM_LIMIT_HINTS.message}
        callBack={closeModal}
      />
    );
  }

  const toggleColor = isMainHint ? 'secondary' : 'primary';

  return (
    <FormControlLabel
      label={label}
      control={
        <Switch checked={checkValue} onChange={handlerOnChange} id={label} color={toggleColor} />
      }
    />
  );
};

Toggle.defaultProps = {
  countHints: 0,
  checkValue: false,
};

Toggle.propTypes = {
  label: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  checkValue: PropTypes.bool,
  settingName: PropTypes.string.isRequired,
  countHints: PropTypes.number,
};

export default Toggle;
