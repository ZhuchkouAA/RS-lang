import React from 'react';
import { Link } from 'react-router-dom';

import { signInPath } from '../pages-path';

const AudioCallPage = () => (
  <>
    <p>AudioCallPage</p>
    <Link to={signInPath}>SignInPage</Link>
  </>
);

export default AudioCallPage;
