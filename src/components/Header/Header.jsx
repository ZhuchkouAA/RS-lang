import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import store from '../../redux/redux-store';
import style from './Header.module.scss';

const Header = ({ setNavBarState, token, navBarState, removeUserData }) => {
  const authButtons = (
    <div className={style['Header__auth-containerLogin']}>
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
    <div className={style['Header__auth-containerLogout']}>
      <Button color="primary" text="logout" handlerClick={removeUserData} />
    </div>
  );

  const handlerOnClickNavBar = () => {
    const state = navBarState === 'disable' ? 'active' : 'disable';

    store.dispatch(setNavBarState(state));
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
    <header className={style.Header}>
      <div className={style.Header__wrapper}>
        {token ? NavBarElement : null}
        {token ? logoutButton : authButtons}
      </div>
    </header>
  );
};

Header.defaultProps = {
  token: null,
  navBarState: 'disable',
};

Header.propTypes = {
  token: PropTypes.string,
  removeUserData: PropTypes.func.isRequired,
  setNavBarState: PropTypes.func.isRequired,
  navBarState: PropTypes.string,
};

export default Header;
