import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import style from './Header.module.scss';

const Header = ({ token, removeUserData }) => {
  const AuthElement = token && <Button text="logout" handlerClick={removeUserData} />;

  return (
    <header className={style.Header}>
      <div className={style.Header__wrapper}>
        <div className={style.Header__navBar}>
          <div className={style['Header__navBar-button']}>
            <span className={style['Header__navBar-button-dash']} />
          </div>
        </div>
        <div className={style['Header__auth-container']}>{AuthElement}</div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  token: null,
};

Header.propTypes = {
  token: PropTypes.string,
  removeUserData: PropTypes.func.isRequired,
};

export default Header;
