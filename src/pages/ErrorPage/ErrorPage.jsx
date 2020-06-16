import React from 'react';
import { NavLink } from 'react-router-dom';

import PATH from '../../constants/path';

const ErrorPage = () => (
  <>
    <p>ErrorPage</p>
    <NavLink to={PATH.SIGN_IN}>SignInPage</NavLink>
  </>
);

export default ErrorPage;
