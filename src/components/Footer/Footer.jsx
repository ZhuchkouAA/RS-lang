import React from 'react';

import { Grid } from '@material-ui/core';

import ProgressBar from '../ProgressBar';

import style from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={style.Footer}>
      <Grid className={style.Footer__container} container direction="row" justify="flex-start">
        <ProgressBar />
        <a
          className={style['Footer__link-rs']}
          href="https://github.com/rolling-scopes-school"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className={style['Footer__img-rs']}
            src="https://avatars3.githubusercontent.com/u/11501370?s=200&v=4"
            width="40"
            height="40"
            alt="RS"
          />
          <p className={style['Footer__header-rs']}>Rolling Scopes School</p>
        </a>
      </Grid>
    </footer>
  );
};

export default Footer;
