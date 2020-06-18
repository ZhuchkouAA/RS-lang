import React from 'react';
import style from './Header.module.scss';

const Header = () => (
  <header className={style.header}>
    <div className={style.header__wrapper}>
      <div className={style.navbarToggle}>
        <div className={style.menuToggle}>
          <span />
        </div>
      </div>
      <div className={style.authContainer}>
        <span className={style.authBtn}>Sing In</span>
        <span>/</span>
        <span className={style.authBtn}>Sing Up</span>
      </div>
    </div>
  </header>
);

export default Header;
