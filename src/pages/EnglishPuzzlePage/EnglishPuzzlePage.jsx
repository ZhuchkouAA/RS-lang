import React from 'react';
import { Link } from 'react-router-dom';

import { signInPath } from '../pages-path';

const EnglishPuzzlePage = () => (
  <>
    <p>EnglishPuzzlePage</p>
    <Link to={signInPath}>SignInPage</Link>
  </>
);

export default EnglishPuzzlePage;
