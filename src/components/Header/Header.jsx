import React from 'react';

import style from './Header.module.scss';

const Header = () => (
  <header className={style.Header}>
    <div className={style.Header__wrapper}>
      <div className={style.Header__navBar}>
        <div className={style['Header__navBar-button']}>
          <span className={style['Header__navBar-button-dash']} />
        </div>
      </div>
      <div className={style['Header__auth-container']}>
        <button className={style['Header__auth-button']} type="button">
          Sing In
        </button>
        <span className={style['Header__auth-buttonSeparator']}>/</span>
        <button className={style['Header__auth-button']} type="button">
          Sing Up
        </button>
      </div>
    </div>
  </header>
);

export default Header;
