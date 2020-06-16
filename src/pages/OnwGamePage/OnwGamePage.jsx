import React from 'react';
import { Link } from 'react-router-dom';

import { signInPath } from '../pages-path';

const OnwGamePage = () => (
  <>
    <p>OnwGamePage</p>
    <Link to={signInPath}>SignInPage</Link>
  </>
);

export default OnwGamePage;
