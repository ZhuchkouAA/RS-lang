import React from 'react';
import style from './Header.module.scss';

const Header = () => (
  <header className={style.header}>
    <div className={style.wrapper}>
      <div className={style['navbar-toggle']}>
        <div className={style['menu-toggle']}>
          <span />
        </div>
      </div>
      <div className={style['auth-container']}>
        <span className={style['auth-btn']}>Sing In</span>
        <span>/</span>
        <span className={style['auth-btn']}>Sing Up</span>
      </div>
    </div>
  </header>
);

export default Header;
