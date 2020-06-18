import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './SignInPage.module.scss';
import LogoutButton from '../../components/LogoutButton/index';

const SignInPage = ({ isSignIn, isSignInRender, token, removeToken, signIn, signUp, message }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  if (token) {
    return <LogoutButton removeUserToken={removeToken} />;
  }

  const submitHandler = () => {
    if (isSignIn) {
      signIn(login, password);
    } else {
      signUp(login, password);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
        className={styles.form}
      >
        <label className={styles.form__label} htmlFor={styles.form}>
          Login:
          <input
            onChange={(e) => setLogin(e.target.value)}
            type="email"
            name="login"
            required="required"
            value={login}
          />
          Password:
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            required="required"
            value={password}
          />
          <input type="submit" value={isSignIn ? `log in` : `sign up`} />
        </label>
        <button type="button" onClick={() => isSignInRender(!isSignIn)}>
          {isSignIn ? `sign up` : `log in`}
        </button>
        <div>{message}</div>
      </form>
    </>
  );
};

SignInPage.defaultProps = {
  isSignIn: PropTypes.bool,
  isSignInRender: PropTypes.func,
  token: PropTypes.object,
  removeToken: PropTypes.func,
  signIn: PropTypes.func,
  signUp: PropTypes.func,
  message: PropTypes.string,
};

SignInPage.propTypes = {
  isSignIn: PropTypes.bool,
  isSignInRender: PropTypes.func,
  token: PropTypes.string,
  removeToken: PropTypes.func,
  signIn: PropTypes.func,
  signUp: PropTypes.func,
  message: PropTypes.string,
};

export default SignInPage;
