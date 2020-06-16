import React from 'react';
import { Link } from 'react-router-dom';

import { signInPath } from '../pages-path';

const SavannaPage = () => (
  <>
    <p>SavannaPage</p>
    <Link to={signInPath}>SignInPage</Link>
  </>
);

export default SavannaPage;
