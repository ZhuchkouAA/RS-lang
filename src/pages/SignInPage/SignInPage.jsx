import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Button from '../../components/Button';
import SuperBackground from '../../components/SuperBackground';

import styles from './SignInPage.module.scss';

const SignInPage = ({
  isSignIn,
  isSignInRender,
  isButtonDisabled,
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
    <>
      <SuperBackground />
      <div className={styles.Login}>
        <form onSubmit={handlerSubmit} className={styles.Login__form}>
          <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email / Логин"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handlerOnChangeSetLogin}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              onChange={handlerOnChangeSetPassword}
            />
            <Button
              type="submit"
              text={isSignIn ? `Войти` : `Зарегистрироваться`}
              isDisable={isButtonDisabled}
              color="primary"
            />
            <button
              type="button"
              className={styles['Form-switcher']}
              onClick={handlerOnClickIsSignIn}
            >
              {isSignIn ? `Регистрация` : `Войти`}
            </button>
            <div className={styles['Form-alert']}>{message}</div>
          </Grid>
        </form>
      </div>
    </>
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
  isButtonDisabled: PropTypes.bool.isRequired,
};

export default SignInPage;
