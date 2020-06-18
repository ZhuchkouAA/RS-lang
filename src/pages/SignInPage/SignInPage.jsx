import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './SignInPage.module.scss';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import { isSignInRender, removeToken } from '../../redux/actions/creators/sign-in-data';
import signIn from '../../middlewares/users/sign-in';
import signUp from '../../middlewares/users/sign-up';

const SignInPage = ({
  isSignIn,
  setIsSignIn,
  token,
  removeUserToken,
  signInRequest,
  signUpRequest,
  message,
}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  if (token) {
    return <LogoutButton removeUserToken={removeUserToken} />;
  }

  const submitHandler = () => {
    if (isSignIn) {
      signInRequest(login, password);
    } else {
      signUpRequest(login, password);
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
        <button type="button" onClick={() => setIsSignIn(!isSignIn)}>
          {isSignIn ? `sign up` : `log in`}
        </button>
        <div>{message}</div>
      </form>
    </>
  );
};

SignInPage.defaultProps = {
  isSignIn: PropTypes.bool,
  setIsSignIn: PropTypes.func,
  token: PropTypes.object,
  removeUserToken: PropTypes.func,
  signInRequest: PropTypes.func,
  signUpRequest: PropTypes.func,
  message: PropTypes.string,
};

SignInPage.propTypes = {
  isSignIn: PropTypes.bool,
  setIsSignIn: PropTypes.func,
  token: PropTypes.string,
  removeUserToken: PropTypes.func,
  signInRequest: PropTypes.func,
  signUpRequest: PropTypes.func,
  message: PropTypes.string,
};

const mapStateToProps = ({ userData }) => {
  return {
    ...userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signInRequest: (login, password) => dispatch(signIn(login, password)),
    signUpRequest: (login, password) => dispatch(signUp(login, password)),
    removeUserToken: () => dispatch(removeToken()),
    setIsSignIn: (isSignIn) => dispatch(isSignInRender(isSignIn)),
  };
};

const SignInPageContainer = connect(mapStateToProps, mapDispatchToProps)(SignInPage);
export default SignInPageContainer;
