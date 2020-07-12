import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import style from './Header.module.scss';

const Header = ({ toggleNav, token, removeUserData }) => {
  const authButtons = (
    <div className={style['Header__auth-container-login']}>
      <button className={style['Header__auth-button']} type="button">
        Sing In
      </button>
      <span className={style['Header__auth-buttonSeparator']}>/</span>
      <button className={style['Header__auth-button']} type="button">
        Sing Up
      </button>
    </div>
  );
  const logoutButton = (
    <div className={style['Header__auth-container-logout']}>
      <Button color="primary" text="Выйти" handlerClick={removeUserData} />
    </div>
  );

  const handlerOnClickNavBar = () => {
    toggleNav(true);
  };

  const NavBarElement = (
    <div className={style.Header__navBar}>
      <button
        onClick={handlerOnClickNavBar}
        className={style['Header__navBar-button']}
        type="button"
      >
        <span className={style['Header__navBar-button-dash']} />
      </button>
    </div>
  );

  return (
    <>
      <header className={style.Header}>
        <div className={style['Header-stiky']}>
          <div className={style.Header__wrapper}>
            {token && NavBarElement}
            {token ? logoutButton : authButtons}
          </div>
        </div>
      </header>
    </>
  );
};

Header.defaultProps = {
  token: null,
};

Header.propTypes = {
  token: PropTypes.string,
  removeUserData: PropTypes.func.isRequired,
  toggleNav: PropTypes.func.isRequired,
};

export default Header;
