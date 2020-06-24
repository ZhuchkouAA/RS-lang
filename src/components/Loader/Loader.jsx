import React from 'react';
import classNames from 'classnames';

import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.Load}>
      <div className={styles.Load__bubblingG}>
        <span className={classNames(styles.Load__items, styles.Load__first)} />
        <span className={classNames(styles.Load__items, styles.Load__second)} />
        <span className={classNames(styles.Load__items, styles.Load__third)} />
      </div>
    </div>
  );
};

export default Loader;
