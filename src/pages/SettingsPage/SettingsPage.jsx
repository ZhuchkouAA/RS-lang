import React from 'react';
import { Link } from 'react-router-dom';

import { signInPath } from '../pages-path';

const SettingsPage = () => (
  <>
    <p>SettingsPage</p>
    <Link to={signInPath}>SignInPage</Link>
  </>
);

export default SettingsPage;
