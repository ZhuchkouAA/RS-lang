import React from 'react';
import style from './Header.module.scss';

const Header = () => (
  <header className={style.header}>
    <div className={style.wrapper}>
      <div className={style.navbartoggle}>
        <div className={style.menutoggle}>
          <span />
        </div>
      </div>
      <div className={style.authcontainer}>
        <span className={style.authbtn}>Sing In</span>
        <span>/</span>
        <span className={style.authbtn}>Sing Up</span>
      </div>
    </div>
  </header>
);

export default Header;
