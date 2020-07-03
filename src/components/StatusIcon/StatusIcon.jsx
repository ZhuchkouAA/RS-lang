import React from 'react';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import styles from './StatusIcon.module.scss';

const StatusIcon = ({ isActive }) => {
  if (isActive) {
    return <CheckCircleIcon className={styles.icon} color="inherit" />;
  }
  return <span className={styles.icon} />;
};

StatusIcon.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default StatusIcon;
