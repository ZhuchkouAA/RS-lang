import React from 'react';
import { Link } from 'react-router-dom';

import { signUpPath } from '../pages-path';

const SignInPage = () => (
  <>
    <p>SignInPage</p>
    <Link to={signUpPath}>SignUpPage</Link>
  </>
);

export default SignInPage;
