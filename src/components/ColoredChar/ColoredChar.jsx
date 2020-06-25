import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { MANY_ERRORS, FEW_ERRORS, NO_ERRORS } from '../../constants/app-settings';
import styles from './ColoredChar.module.scss';

const ColoredChar = ({ value, colorType }) => {
  const letterClasses = classNames(styles.ColoredChar, {
    [styles['ColoredChar__no-errors']]: colorType === NO_ERRORS,
    [styles['ColoredChar__many-errors']]: colorType === MANY_ERRORS,
    [styles['ColoredChar__few-errors']]: colorType === FEW_ERRORS,
  });

  return <span className={letterClasses}>{value}</span>;
};

ColoredChar.propTypes = {
  value: PropTypes.string.isRequired,
  colorType: PropTypes.string.isRequired,
};

export default ColoredChar;
