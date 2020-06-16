import React from 'react';
import { Link } from 'react-router-dom';

import { signInPath } from '../pages-path';

const DictionaryPage = () => (
  <>
    <p>DictionaryPage</p>
    <Link to={signInPath}>SignInPage</Link>
  </>
);

export default DictionaryPage;
