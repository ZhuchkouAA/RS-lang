import React from 'react';
import { NavLink } from 'react-router-dom';

import paths from '../../constants/path';
import styles from './SprintResultPage.module.scss';

const SprintResultPage = () => {
  return (
    <div className={styles.modal}>
      `statistika`
      <NavLink to={paths.MAIN}>`ОК</NavLink>
    </div>
  );
};

export default SprintResultPage;
