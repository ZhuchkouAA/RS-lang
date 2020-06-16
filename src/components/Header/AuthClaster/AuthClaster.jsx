import React from 'react';
import style from './AuthClaster.module.scss';

const AuthClaster = () => (
  <div className={style.authcontainer}>
    <span className={style.authbtn}>Sing In</span>
    <span>/</span>
    <span className={style.authbtn}>Sing Up</span>
  </div>
);

export default AuthClaster;
