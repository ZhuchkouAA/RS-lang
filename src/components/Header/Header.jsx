import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import style from './Header.module.scss';
import { TOKEN } from '../../constants/cookiesNames';

const Header = ({ getUserData, removeUserData }) => {
  const AuthElement = getUserData(TOKEN) ? (
    <Button text="logout" handlerClick={removeUserData} />
  ) : null;

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
  getUserData: () => null,
};

Header.propTypes = {
  getUserData: PropTypes.func,
  removeUserData: PropTypes.func.isRequired,
};

export default Header;
