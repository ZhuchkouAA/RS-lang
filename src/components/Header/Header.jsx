import React from 'react';
import style from './Header.module.scss';

const Header = () => (
  <header className={style.Header}>
    <div className={style.Header__wrapper}>
      <div className={style.Header__navbarContainer}>
        <div className={style.Header__navbarContainer__button}>
          <span className={style.Header__navbarContainer__button_dash} />
        </div>
      </div>
      <div className={style.Header__authContainer}>
        <button className={style.Header__authContainer__button} type="button">
          Sing In
        </button>
        <span className="">/</span>
        <button className={style.Header__authContainer__button} type="button">
          Sing Up
        </button>
      </div>
    </div>
  </header>
);

export default Header;
