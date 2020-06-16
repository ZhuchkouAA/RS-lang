import React from 'react';
import { Link } from 'react-router-dom';

import PATH from '../../constants/path';

const SignInPage = () => (
  <>
    <p>SignInPage</p>
    <Link to={PATH.SIGN_UP}>SignUPage</Link>
  </>
);

export default SignInPage;
