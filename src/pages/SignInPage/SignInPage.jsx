import React, { useState } from 'react';
import PropTypes from 'prop-types';

<<<<<<< HEAD
=======
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// import Link from '@material-ui/core/Link';
>>>>>>> RSL-07-Styling-Aut-Card: styling card
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
import styles from './SignInPage.module.scss';

const SignInPage = ({ isSignIn, token, removeToken, signIn, signUp, message }) => {
>>>>>>> RSL-07-Styling-Aut-Card: styling card
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  console.log(isSignIn);
  const handlerSubmit = (e) => {
    e.preventDefault();
    if (isSignIn) {
      return signIn(login, password, e.target);
    }
    return signUp(login, password, e.target);
  };

  const handlerOnChangeSetLogin = ({ target: { value } }) => {
    console.log('blabla');
    setLogin(value);
  };

  const handlerOnChangeSetPassword = ({ target: { value } }) => {
    setPassword(value);
  };

  // const handlerOnClickIsSignIn = () => {
  //   isSignInRender(!isSignIn);
  // };

  if (token) {
    return <Button handlerClick={removeUserData} text="logout" />;
  }

  return (
    // <form onSubmit={handlerSubmit} className={styles.Form}>
    //   <label className={styles.Form__label} htmlFor={styles.Form}>
    //     Логин/Email:
    //     <input
    //       onChange={handlerOnChangeSetLogin}
    //       type="email"
    //       name="login"
    //       required="required"
    //       value={login}
    //     />
    //     Пароль:
    //     <input
    //       onChange={handlerOnChangeSetPassword}
    //       type="password"
    //       name="password"
    //       required="required"
    //       value={password}
    //     />
    //     <Button type="submit" text={isSignIn ? `Войти` : `Зарегистрироваться`}/>
    //   </label>
    //   <Button handlerClick={handlerOnClickIsSignIn} text={isSignIn ? `Регистрация` : `Войти`}/>
    //   <div>{message}</div>
    // </form>
    <form onSubmit={handlerSubmit} className={styles.Form}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
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
        label="Password"
        type="password"
        id="password"
        onChange={handlerOnChangeSetPassword}
      />
      <Button
        className={styles.Form__button}
        type="submit"
        text={isSignIn ? `Войти` : `Зарегистрироваться`}
      />
      <Grid container>
        <Grid item xs>
          {/* <Link className={styles.Form__link} onClick={handlerOnClickIsSignIn}> */}
          {/*  {isSignIn ? `Регистрация` : `Войти`} */}
          {/* </Link> */}
        </Grid>
      </Grid>
      <div>{message}</div>
    </form>
  );
};

SignInPage.defaultProps = {
  token: null,
};

SignInPage.propTypes = {
  isSignIn: PropTypes.bool.isRequired,
  token: PropTypes.string,
  removeUserData: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default SignInPage;
