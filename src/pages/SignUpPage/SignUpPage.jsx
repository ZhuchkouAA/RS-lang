import React from 'react';
import { Link } from 'react-router-dom';

import { signInPath } from '../pages-path';

const SignUpPage = () => (
  <>
    <p>SignUpPage</p>
    <Link to={signInPath}>SignInPage</Link>
  </>
);

export default SignUpPage;
