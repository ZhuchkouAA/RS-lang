import React, { useState } from 'react';
import PropTypes from 'prop-types';
<<<<<<< HEAD

<<<<<<< HEAD
=======
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
<<<<<<< HEAD
// import Link from '@material-ui/core/Link';
>>>>>>> RSL-07-Styling-Aut-Card: styling card
=======
>>>>>>> RSL-07: add buttonActivitySwitcher
import Button from '../../components/Button';
import styles from './SignInPage.module.scss';

<<<<<<< HEAD
const SignInPage = ({
  isSignIn,
  isSignInRender,
  token,
  removeUserData,
  signIn,
  signUp,
  message,
}) => {
=======
=======
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Button from '../../components/Button';
>>>>>>> RSL-07: fix tabs
import styles from './SignInPage.module.scss';

<<<<<<< HEAD
const SignInPage = ({ isSignIn, token, removeToken, signIn, signUp, message }) => {
>>>>>>> RSL-07-Styling-Aut-Card: styling card
=======
const SignInPage = ({
  isSignIn,
  token,
  removeToken,
  isSignInRender,
  isButtonDisabled,
  signIn,
  signUp,
  message,
}) => {
>>>>>>> RSL-07: add buttonActivitySwitcher
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (isSignIn) {
      return signIn(login, password, e.target);
    }
    return signUp(login, password, e.target);
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
        />
        <button type="button" className={styles.Form__switcher} onClick={handlerOnClickIsSignIn}>
          {isSignIn ? `Регистрация` : `Войти`}
        </button>
        <div className={styles.Form__alert}>{message}</div>
      </Grid>
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
  isButtonDisabled: PropTypes.bool.isRequired,
};

export default SignInPage;
