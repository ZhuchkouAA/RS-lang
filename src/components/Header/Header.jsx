import React from 'react';

import PropTypes from 'prop-types';

import store from '../../redux/redux-store';
import style from './Header.module.scss';

const Header = ({ setNavBarState }) => {
  const handlerOnClickNavBar = () => {
    const { navBar } = store.getState();
    const state = navBar.state === 'disable' ? 'active' : 'disable';

    store.dispatch(setNavBarState(state));
  };

  return (
    <header className={style.Header}>
      <div className={style.Header__wrapper}>
        <div className={style.Header__navBar}>
          <button
            onClick={handlerOnClickNavBar}
            className={style['Header__navBar-button']}
            type="button"
          >
            <span className={style['Header__navBar-button-dash']} />
          </button>
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
};

Header.propTypes = {
  setNavBarState: PropTypes.func.isRequired,
};

export default Header;
