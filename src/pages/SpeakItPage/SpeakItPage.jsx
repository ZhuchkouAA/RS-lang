import React from 'react';
import { Link } from 'react-router-dom';

import { signInPath } from '../pages-path';

const SpeakItPage = () => (
  <>
    <p>SpeakItPage</p>
    <Link to={signInPath}>SignInPage</Link>
  </>
);

export default SpeakItPage;
