import React from 'react';
import { Link } from 'react-router-dom';

import { signInPath } from '../pages-path';

const SprintPage = () => (
  <>
    <p>SprintPage</p>
    <Link to={signInPath}>SignInPage</Link>
  </>
);

export default SprintPage;
