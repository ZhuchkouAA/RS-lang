import React from 'react';
import style from './Header.module.scss';
import AuthClaster from './AuthClaster/AuthClaster';
import NavbarToggler from './NavbarToggler/NavbarToggler';

const Header = () => (
  <header className={style.header}>
    <div className={style.wrapper}>
      <NavbarToggler />
      <AuthClaster />
    </div>
  </header>
);

export default Header;
