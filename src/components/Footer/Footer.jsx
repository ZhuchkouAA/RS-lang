import React from 'react';

import { Grid } from '@material-ui/core';

import ProgressBar from '../ProgressBar';

import style from './Footer.module.scss';

const Footer = () => {
  return (
    <footer>
      <Grid className={style.Footer__container} container direction="row" justify="flex-end">
        <ProgressBar />
      </Grid>
    </footer>
  );
};

export default Footer;
