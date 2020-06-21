import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import styles from './SignInPage.module.scss';

const SignInPage = ({
  isSignIn,
  isSignInRender,
  token,
  removeUserData,
  signIn,
  signUp,
  message,
}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (isSignIn) {
      return signIn(login, password);
    }
    return signUp(login, password);
  };

  const handlerOnChangeSetLogin = ({ target: { value } }) => {
    setLogin(value);
  };

  const handlerOnChangeSetPassword = ({ target: { value } }) => {
    setPassword(value);
  };

  const handlerOnClickIsSignIn = () => {
    isSignInRender(!isSignIn);
  };

  if (token) {
    return <Button handlerClick={removeUserData} text="logout" />;
  }

  return (
    <form onSubmit={handlerSubmit} className={styles.Form}>
      <label className={styles.Form__label} htmlFor={styles.Form}>
        Логин/Email:
        <input
          onChange={handlerOnChangeSetLogin}
          type="email"
          name="login"
          required="required"
          value={login}
        />
        Пароль:
        <input
          onChange={handlerOnChangeSetPassword}
          type="password"
          name="password"
          required="required"
          value={password}
        />
        <input type="submit" value={isSignIn ? `Войти` : `Зарегистрироваться`} />
      </label>
      <button type="button" onClick={handlerOnClickIsSignIn}>
        {isSignIn ? `Регистрация` : `Войти`}
      </button>
      <div>{message}</div>
    </form>
  );
};

SignInPage.defaultProps = {
  token: null,
};

SignInPage.propTypes = {
  isSignIn: PropTypes.bool.isRequired,
  isSignInRender: PropTypes.func.isRequired,
  token: PropTypes.string,
  removeUserData: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default SignInPage;
