import React from 'react';

import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.Load}>
      <div className={styles.Load__bubblingG}>
        <span className={styles.Load__bubblingG__first} />
        <span className={styles.Load__bubblingG__second} />
        <span className={styles.Load__bubblingG__third} />
      </div>
    </div>
  );
};

export default Loader;
