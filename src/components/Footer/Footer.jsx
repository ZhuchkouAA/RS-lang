import React from 'react';

import { Grid } from '@material-ui/core';
import style from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={style.Footer}>
      <Grid className={style.Footer__container} container direction="row" justify="flex-start">
        <a className={style.Footer__linkRs} href="https://github.com/rolling-scopes-school">
          <img
            className={style.Footer__imgRs}
            src="https://avatars3.githubusercontent.com/u/11501370?s=200&v=4"
            width="50"
            height="50"
            alt="RS"
          />
          <p className={style.Footer__headerRs}>Rolling Scopes School</p>
        </a>
      </Grid>
    </footer>
  );
};

export default Footer;
