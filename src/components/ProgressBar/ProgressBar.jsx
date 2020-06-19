import React from 'react';
import PropTypes from 'prop-types';

import styles from './ProgressBar.module.scss';

const ProgressBar = ({ max, now }) => {
  const percent = (now * 100) / max;

  return (
    <div className={styles.Progress}>
      <p className={styles.Progress__count}>{`${now} / ${max}`}</p>
      <div className={styles.Progress__bar} style={{ width: `${percent}%` }} />
    </div>
  );
};

ProgressBar.propTypes = {
  max: PropTypes.number.isRequired,
  now: PropTypes.number.isRequired,
};

export default ProgressBar;
