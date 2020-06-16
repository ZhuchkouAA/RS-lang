import React from 'react';
import { Link } from 'react-router-dom';

import { signInPath } from '../pages-path';

const MainPage = () => (
  <>
    <p>MainPage</p>
    <Link to={signInPath}>SignInPage</Link>
  </>
);

export default MainPage;
