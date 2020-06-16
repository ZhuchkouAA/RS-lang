import React from 'react';
import { NavLink } from 'react-router-dom';

import PATH from '../../constants/path';

const SignInPage = () => (
  <>
    <p>SignInPage</p>
    <NavLink to={PATH.SIGN_UP}>SignUPage</NavLink>
  </>
);

export default SignInPage;
