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
      <div className="auth__container" />
    </div>
  </header>
);

export default Header;
