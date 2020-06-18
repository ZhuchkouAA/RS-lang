import React from 'react';
import style from './Header.module.scss';

const Header = () => (
  <header className={style.Header}>
    <div className={style.Header__Wrapper}>
      <div className={style.NavbarContainer}>
        <div className={style.NavbarContainer__Button}>
          <span />
        </div>
      </div>
      <div className={style.AuthContainer}>
        <span className={style.AuthContainer__Button}>Sing In</span>
        <span>/</span>
        <span className={style.AuthContainer__Button}>Sing Up</span>
      </div>
    </div>
  </header>
);

export default Header;
