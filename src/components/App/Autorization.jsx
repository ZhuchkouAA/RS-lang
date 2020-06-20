import { Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import PATH from '../../constants/path';
import SignInPage from '../../pages/SignInPage';

const Autorization = () => (
  <Switch>
    <Route exact path={PATH.SIGN_IN} component={SignInPage} />
    <Redirect to={{ pathname: PATH.SIGN_IN }} />
  </Switch>
);

export default Autorization;
